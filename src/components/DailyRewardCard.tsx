import { useTranslation } from '../i18n';

export function DailyRewardCard() {
  const { t } = useTranslation();
  const claim = () => window.dispatchEvent(new CustomEvent('merge-toast', { detail: t('dailySoon') }));
  return (
    <aside className="daily-reward-card">
      <div className="reward-gift" aria-hidden="true"><i /><span /></div>
      <div><strong>{t('dailyReward')}</strong><small>{t('claimFree')}</small></div>
      <button onClick={claim}>{t('claim')}</button>
      <span className="reward-gems"><i>◆</i> 20</span>
      <b className="reward-dot" />
    </aside>
  );
}
