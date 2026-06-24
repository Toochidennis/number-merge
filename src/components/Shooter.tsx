import { COLS } from '../game/constants';
import type { TileValue } from '../game/types';
import { Tile } from './Tile';
import { useTranslation } from '../i18n';

interface ShooterProps {
  currentTile: TileValue;
  nextTile: TileValue;
  selectedColumn: number;
  isShooting: boolean;
  isPromotingNextTile: boolean;
  onSelect: (column: number) => void;
  onShoot: (column: number) => void;
  onPause: () => void;
}

export function Shooter({ currentTile, nextTile, selectedColumn, isShooting, isPromotingNextTile, onSelect, onShoot, onPause }: ShooterProps) {
  const { t } = useTranslation();
  const columnFromPointer = (element: HTMLElement, clientX: number) => {
    const rect = element.getBoundingClientRect();
    return Math.max(0, Math.min(COLS - 1, Math.floor(((clientX - rect.left) / rect.width) * COLS)));
  };

  return (
    <div
      className="shooter-rail"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        onSelect(columnFromPointer(event.currentTarget, event.clientX));
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          onSelect(columnFromPointer(event.currentTarget, event.clientX));
        }
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          onShoot(columnFromPointer(event.currentTarget, event.clientX));
        }
      }}
    >
      <div className={`next-chip ${isPromotingNextTile ? 'promoting' : ''}`} aria-label={t('nextBlock', { value: nextTile })}>
        <small>{t('next')}</small>
        {!isPromotingNextTile && <Tile key={nextTile} value={nextTile} compact />}
      </div>
      <div className="shooter-position">
        <div className={`shooter-slot ${isShooting || isPromotingNextTile ? 'empty' : ''}`}>
          {!isShooting && !isPromotingNextTile && <Tile value={currentTile} className="shooter-current-tile" />}
        </div>
        {isPromotingNextTile && (
          <div className="promotion-flight" aria-hidden="true">
            <Tile value={currentTile} className="shooter-current-tile" />
          </div>
        )}
        <span className="aim-chevron">▲</span>
      </div>
      <div className="lane-indicator" style={{ '--selected-column': selectedColumn } as React.CSSProperties}>
        <i />
      </div>
      <button className="pause-button" onPointerDown={(event) => event.stopPropagation()} onClick={onPause} aria-label={t('pause')}>Ⅱ</button>
    </div>
  );
}
