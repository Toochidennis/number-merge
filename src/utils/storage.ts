export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(`number-merge:${key}`);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`number-merge:${key}`, JSON.stringify(value));
    } catch {
      // Storage can be unavailable in private WebViews; gameplay still works.
    }
  },
};
