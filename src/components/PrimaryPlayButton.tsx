import { useTranslation } from '../i18n';

export function PrimaryPlayButton({ onPlay }: { onPlay: () => void }) {
  const { t } = useTranslation();
  return (
    <button className="primary-play-button" onClick={onPlay}>
      <span><small>{t('stage')}</small><strong>{t('playNow')}</strong></span>
      <i aria-hidden="true"><b /></i>
    </button>
  );
}
