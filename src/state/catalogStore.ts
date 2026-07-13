import { create } from 'zustand';
import { loadCountries, loadLanguages, type CountryOption, type LanguageOption } from '../data/catalog';

type CatalogStatus = 'idle' | 'loading' | 'ready' | 'error';

type CatalogState = {
  countries: CountryOption[];
  languages: LanguageOption[];
  status: CatalogStatus;
  error: string | null;
  stale: boolean;
  load: () => Promise<void>;
};

export const useCatalogStore = create<CatalogState>((set, get) => ({
  countries: [], languages: [], status: 'idle', error: null, stale: false,
  load: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    const results = await Promise.allSettled([loadCountries(), loadLanguages()]);
    const countriesResult = results[0];
    const languagesResult = results[1];
    const countries = countriesResult.status === 'fulfilled' ? countriesResult.value : [];
    const languages = languagesResult.status === 'fulfilled' ? languagesResult.value.data : [];
    const stale = languagesResult.status === 'fulfilled' && languagesResult.value.stale;
    const errors = results.filter((result): result is PromiseRejectedResult => result.status === 'rejected');
    set({ countries, languages, stale, status: errors.length === results.length ? 'error' : 'ready', error: errors[0] ? String(errors[0].reason?.message || errors[0].reason || 'Catalog could not be loaded') : null });
  },
}));

export const loadCatalogs = () => useCatalogStore.getState().load();
