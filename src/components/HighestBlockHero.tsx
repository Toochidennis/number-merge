import type { TileValue } from '../game/types';
import { getNextMilestone } from '../game/milestones';
import { Tile } from './Tile';
import { useTranslation } from '../i18n';

export function getNextGoal(highestBlock: number) {
  return getNextMilestone(highestBlock as TileValue);
}

export function getGoalProgress(highestBlock: number, goal: number) {
  return Math.min(100, Math.round((highestBlock / goal) * 100));
}

export function HighestBlockHero({ highestBlock }: { highestBlock: TileValue }) {
  const { t, formatNumber } = useTranslation();
  const nextGoal = getNextGoal(highestBlock);
  const progress = getGoalProgress(highestBlock, nextGoal);

  return (
    <section className="highest-block-hero">
      <div className="hero-kicker"><i /> {t('highestBlock')} <i /></div>
      <div className="hero-orbit" aria-hidden="true"><span /><span /><b /><b /></div>
      <div className="hero-block-wrap"><Tile value={highestBlock} crown className="premium-hero-tile" /></div>
      <p>{t('keepMerging', { goal: formatNumber(nextGoal) })}</p>
      <div className="goal-progress-copy"><span>{t('nextGoal')} <b>{formatNumber(nextGoal)}</b></span><strong>{progress}%</strong></div>
      <div className="goal-progress-track"><i style={{ width: `${progress}%` }} /></div>
    </section>
  );
}
