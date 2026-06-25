import type { BoosterType } from '../game/types';
import { useTranslation } from '../i18n';

const boosters: Array<{ type: BoosterType; icon: string; label: string; ariaLabel: string }> = [
  { type: 'hammer', icon: '🔨', label: 'smash', ariaLabel: 'Use hammer booster' },
  { type: 'swap',   icon: '⟳', label: 'swap',  ariaLabel: 'Use swap booster' },
  { type: 'undo',   icon: '↶', label: 'undo',  ariaLabel: 'Use undo booster' },
];

export function BoosterBar({ counts, active, onUse }: {
  counts: Record<BoosterType, number>;
  active: BoosterType | null;
  onUse: (type: BoosterType) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="booster-bar">
      {boosters.map((booster) => (
        <button
          key={booster.type}
          className={active === booster.type ? 'active' : ''}
          disabled={counts[booster.type] <= 0}
          onClick={() => onUse(booster.type)}
          aria-label={booster.ariaLabel}
        >
          <span className={`booster-icon ${booster.type}`} aria-hidden="true">{booster.icon}</span>
          <span className="booster-copy"><strong>{t(booster.label)}</strong><small>×{counts[booster.type]}</small></span>
        </button>
      ))}
    </div>
  );
}
