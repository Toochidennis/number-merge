import { useTranslation } from '../i18n';

export function GemPill({ gems }: { gems: number }) {
  const { t, formatNumber } = useTranslation();
  const addGems = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.dispatchEvent(new CustomEvent('merge-toast', { detail: t('gemSoon') }));
  };

  return (
    <div className="premium-gem-pill" aria-label={`${formatNumber(gems)} ${t('gems')}`}>
      <span className="gem-diamond">◆</span>
      <strong>{formatNumber(gems)}</strong>
      <button onClick={addGems} aria-label={t('getMoreGems')}>+</button>
    </div>
  );
}
