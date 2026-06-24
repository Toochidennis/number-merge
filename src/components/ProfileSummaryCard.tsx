import type { PlayerProfile } from '../types/profile';
import { AvatarIcon } from './avatars/AvatarIcon';
import { CountryFlag } from './CountryFlag';
import { GemPill } from './GemPill';
import { useTranslation } from '../i18n';

interface ProfileSummaryCardProps {
  profile: PlayerProfile;
  level: number;
  gems: number;
  levelProgress: number;
  onOpenProfile: () => void;
}

export function ProfileSummaryCard({ profile, level, gems, levelProgress, onOpenProfile }: ProfileSummaryCardProps) {
  const { t } = useTranslation();
  return (
    <header className="profile-summary-card">
      <button className="profile-summary-main" onClick={onOpenProfile} aria-label={t('openProfile')}>
        <span className="summary-avatar"><AvatarIcon avatarId={profile.avatarId} size={54} /></span>
        <span className="summary-copy">
          <small>{t('welcomeBack')}</small>
          <strong>{profile.username || t('player')}</strong>
          <span><CountryFlag countryCode={profile.countryCode} /> {profile.countryName}<i /> <b>{t('level', { level })}</b></span>
          <span className="summary-level-progress" aria-label={t('progressNext', { progress: levelProgress })}><i style={{ width: `${levelProgress}%` }} /></span>
        </span>
      </button>
      <GemPill gems={gems} />
    </header>
  );
}
