import type { MilestoneInfo } from '../game/types';
import { Tile } from './Tile';
import { useTranslation } from '../i18n';

export function MilestoneModal({ info, onContinue }: { info: MilestoneInfo; onContinue: () => void }) {
  const { t, formatNumber } = useTranslation();
  return (
    <div className="modal-layer milestone-layer">
      <div className="milestone-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="modal-card milestone-modal">
        <small>{t('progressionMilestone')}</small>
        <h2>{t('reached', { value: formatNumber(info.current) })}</h2>
        <div className="milestone-current"><Tile value={info.current} crown /></div>
        <div className="retirement-announcement">
          <div className="retired-tile"><Tile value={info.retired} /><i /></div>
          <div><small>{t('blockRetired')}</small><strong>{t('noLongerAppear', { value: formatNumber(info.retired) })}</strong></div>
        </div>
        <div className="next-milestone-copy"><small>{t('nextMilestone')}</small><strong>{formatNumber(info.next)}</strong></div>
        <button className="modal-primary" onClick={onContinue}>{t('continue')}</button>
      </div>
    </div>
  );
}
