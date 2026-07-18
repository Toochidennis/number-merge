export type CountryOption = {
  code: string;
  name: string;
  emoji?: string;
  image?: string;
};

export type LanguageOption = {
  code: string;
  label: string;
  name: string;
  flag: string;
  locale: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
};

type ApiCountry = { code: string; name: string; emoji?: string; image?: string };
type ApiLanguage = {
  code: string;
  name: string;
  native_name?: string;
  locale: string;
  direction?: 'ltr' | 'rtl';
  flag?: string;
  is_default?: number | boolean | string;
  is_active?: number | boolean | string;
};
type Envelope<T> = { success: boolean; message?: string; data?: T[] };

export const COUNTRIES_CACHE_KEY = 'blockfall-countries-v1';
export const LANGUAGES_DB_NAME = 'blockfall-catalog';
export const LANGUAGES_STORE_NAME = 'languages';
const LANGUAGE_CACHE_KEY = 'catalog';
const LANGUAGE_CACHE_MAX_AGE = 4 * 24 * 60 * 60 * 1000;
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'https://linkskool.net/api/v4').replace(/\/$/, '');
const API_KEY = import.meta.env.VITE_API_KEY as string | undefined;

const isTruthy = (value: unknown) => value === true || value === 1 || value === '1';

export function flagEmojiToCode(flag: string): string {
  const codePoints = [...flag].map((character) => character.codePointAt(0) ?? 0);
  if (codePoints.length !== 2 || codePoints.some((point) => point < 127462 || point > 127487)) return 'GB';
  return codePoints.map((point) => String.fromCharCode(point - 127397)).join('');
}

async function fetchCatalog<T>(path: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: API_KEY ? { 'x-api-key': API_KEY } : undefined });
  if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
  const payload = await response.json() as Envelope<T>;
  if (!payload.success || !Array.isArray(payload.data)) throw new Error(payload.message || 'Catalog response was invalid');
  return payload.data;
}

function normalizeCountries(data: ApiCountry[]): CountryOption[] {
  return data.filter((country) => country.code && country.name).map((country) => ({
    code: country.code.toUpperCase(), name: country.name, emoji: country.emoji, image: country.image,
  }));
}

function normalizeLanguages(data: ApiLanguage[]): LanguageOption[] {
  return data.filter((language) => isTruthy(language.is_active) && language.code && language.name).map((language) => ({
    code: language.code,
    label: language.native_name || language.name,
    name: language.name,
    flag: language.flag || '',
    locale: language.locale || language.code,
    direction: language.direction === 'rtl' ? 'rtl' : 'ltr',
    isDefault: isTruthy(language.is_default),
  }));
}

function readCountryCache(): CountryOption[] {
  try {
    const value = JSON.parse(localStorage.getItem(COUNTRIES_CACHE_KEY) ?? 'null');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export async function loadCountries(): Promise<CountryOption[]> {
  const cached = readCountryCache();
  if (cached.length) return cached;
  const countries = normalizeCountries(await fetchCatalog<ApiCountry>('/public/games/countries'));
  if (!countries.length) throw new Error('Countries catalog is empty');
  localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify(countries));
  return countries;
}

type LanguageRecord = { savedAt: number; data: LanguageOption[] };

function openLanguageDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LANGUAGES_DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(LANGUAGES_STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readLanguageCache(): Promise<LanguageRecord | null> {
  try {
    const db = await openLanguageDb();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(LANGUAGES_STORE_NAME, 'readonly').objectStore(LANGUAGES_STORE_NAME).get(LANGUAGE_CACHE_KEY);
      request.onsuccess = () => resolve((request.result as LanguageRecord | undefined) ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch { return null; }
}

async function writeLanguageCache(data: LanguageOption[]): Promise<void> {
  const db = await openLanguageDb();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(LANGUAGES_STORE_NAME, 'readwrite').objectStore(LANGUAGES_STORE_NAME).put({ savedAt: Date.now(), data }, LANGUAGE_CACHE_KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function loadLanguages(): Promise<{ data: LanguageOption[]; stale: boolean }> {
  const cached = await readLanguageCache();
  if (cached?.data.length && Date.now() - cached.savedAt < LANGUAGE_CACHE_MAX_AGE) return { data: cached.data, stale: false };
  try {
    const languages = normalizeLanguages(await fetchCatalog<ApiLanguage>('/public/games/languages'));
    if (!languages.length) throw new Error('Languages catalog is empty');
    await writeLanguageCache(languages);
    return { data: languages, stale: false };
  } catch (error) {
    if (cached?.data.length) return { data: cached.data, stale: true };
    throw error;
  }
}
