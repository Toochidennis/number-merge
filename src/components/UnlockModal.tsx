import { REWARD_VALUES } from '../game/constants';
import type { TileValue } from '../game/types';
import { Tile } from './Tile';
import { useTranslation } from '../i18n';

export function UnlockModal({ value, onClaim }: { value: TileValue; onClaim: (double: boolean) => void }) {
  const { t } = useTranslation();
  const reward = REWARD_VALUES[value] ?? 10;
  return (
    <div className="modal-layer celebration-layer">
      <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} />)}</div>
      <div className="modal-card unlock-modal">
        <small>{t('newMilestone')}</small>
        <h2>{t('newBlockUnlocked')}</h2>
        <div className="unlock-rays"><Tile value={value} crown /></div>
        <span className="reward-label">{t('yourReward')}</span>
        <strong className="reward-amount"><i>◆</i> +{reward}</strong>
        <button className="modal-primary" onClick={() => onClaim(true)}>{t('claimDouble')}</button>
        <button className="modal-link" onClick={() => onClaim(false)}>{t('noThanks')}</button>
      </div>
    </div>
  );
}
