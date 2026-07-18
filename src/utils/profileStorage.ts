import { isAvatarId } from '../components/avatars/avatarData';
import type { PlayerProfile } from '../types/profile';

export const PROFILE_STORAGE_KEY = 'number-merge-player-profile';

export function countryCodeToFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export const DEFAULT_PROFILE: PlayerProfile = {
  username: 'Player',
  countryCode: 'NG',
  countryName: 'Nigeria',
  countryFlag: countryCodeToFlagEmoji('NG'),
  avatarId: 'avatar-1',
};

export function sanitizeProfile(value: unknown): PlayerProfile {
  const candidate = value && typeof value === 'object' ? value as Partial<PlayerProfile> : {};
  const username = typeof candidate.username === 'string'
    ? candidate.username.replace(/[^\p{L}\p{N}_ ]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 16)
    : '';
  const requestedCode = typeof candidate.countryCode === 'string' ? candidate.countryCode.toUpperCase() : '';
  const countryCode = /^[A-Z]{2}$/.test(requestedCode) ? requestedCode : DEFAULT_PROFILE.countryCode;
  const countryName = typeof candidate.countryName === 'string' && candidate.countryName.trim()
    ? candidate.countryName.trim()
    : DEFAULT_PROFILE.countryName;

  return {
    username: username || DEFAULT_PROFILE.username,
    countryCode,
    countryName: countryCode === DEFAULT_PROFILE.countryCode ? (countryName || DEFAULT_PROFILE.countryName) : countryName,
    countryFlag: typeof candidate.countryFlag === 'string' && candidate.countryFlag ? candidate.countryFlag : countryCodeToFlagEmoji(countryCode),
    avatarId: typeof candidate.avatarId === 'string' && isAvatarId(candidate.avatarId)
      ? candidate.avatarId
      : DEFAULT_PROFILE.avatarId,
  };
}

export function loadProfile(): PlayerProfile {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    return stored ? sanitizeProfile(JSON.parse(stored)) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(sanitizeProfile(profile)));
  } catch {
    // Profile remains available in React state if storage is unavailable.
  }
}
