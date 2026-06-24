import { getTileColor } from '../game/constants';
import type { TileValue } from '../game/types';
import { useTranslation } from '../i18n';

interface TileProps {
  value: TileValue;
  className?: string;
  crown?: boolean;
  compact?: boolean;
}

export function Tile({ value, className = '', crown = false, compact = false }: TileProps) {
  const { t, formatNumber } = useTranslation();
  const color = getTileColor(value);
  return (
    <div
      className={`tile tile-${value} ${value >= 512 ? 'tile-glow' : ''} ${compact ? 'tile-compact' : ''} ${className}`}
      style={{
        '--tile-start': color.start,
        '--tile-end': color.end,
        '--tile-glow': color.glow,
      } as React.CSSProperties}
      aria-label={t('block', { value: formatNumber(value) })}
    >
      {crown && (
        <span className="tile-crown" aria-label={t('currentMilestone')}>
          <svg viewBox="0 0 32 26" aria-hidden="true">
            <path d="M3 7 10 13 16 3l6 10 7-6-3 14H6L3 7Z" />
            <path d="M7 23h18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      )}
      <span>{value}</span>
    </div>
  );
}
