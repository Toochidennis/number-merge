import type { TileValue } from '../game/types';
import { Tile } from './Tile';
import { useTranslation } from '../i18n';

export function CreatedAgainModal({ value, gems, onResolve }: { value: TileValue; gems: number; onResolve: (upgrade: boolean) => void }) {
  const { t, formatNumber } = useTranslation();
  return (
    <div className="modal-layer">
      <div className="modal-card created-modal">
        <small>{t('rareMerge')}</small><h2>{t('createdAgain')}</h2>
        <Tile value={value} crown />
        <p>{t('createdAgainBody', { value: formatNumber(value) })}</p>
        <button className="modal-primary" disabled={gems < 155} onClick={() => onResolve(true)}><i>◆</i> 155</button>
        <button className="modal-link" onClick={() => onResolve(false)}>{t('noThanks')}</button>
      </div>
    </div>
  );
}
