import { useTranslation } from '../i18n';

export function TopBar({ gems, score, bestScore }: { gems: number; score: number; bestScore: number }) {
  const { t, formatNumber } = useTranslation();
  return (
    <header className="top-bar">
      <div className="stat gems"><i>◆</i><div><small>{t('gems')}</small><strong>{formatNumber(gems)}</strong></div><button aria-label={t('getGems')}>+</button></div>
      <div className="score-stat"><small>{t('score')}</small><strong>{formatNumber(score)}</strong></div>
      <div className="stat best"><i>♛</i><div><small>{t('best')}</small><strong>{formatNumber(bestScore)}</strong></div></div>
    </header>
  );
}
