import { useCallback, useState } from 'react';
import type { PlayerProfile } from '../types/profile';
import { DEFAULT_PROFILE, loadProfile, sanitizeProfile, saveProfile } from '../utils/profileStorage';

export function usePlayerProfile() {
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);

  const updateProfile = useCallback((nextProfile: PlayerProfile) => {
    const cleanProfile = sanitizeProfile(nextProfile);
    setProfile(cleanProfile);
    saveProfile(cleanProfile);
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    saveProfile(DEFAULT_PROFILE);
  }, []);

  return { profile, updateProfile, resetProfile };
}
