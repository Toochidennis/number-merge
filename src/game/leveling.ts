import type { MergeEvent, TileValue } from './types';

export interface LevelProgress {
  level: number;
  xpIntoLevel: number;
  xpToNextLevel: number;
  progressPercent: number;
}

export function getXpRequiredForNextLevel(level: number): number {
  return Math.round(120 + 42 * Math.pow(Math.max(0, level - 1), 1.25));
}

export function getTotalXpForLevel(level: number): number {
  let total = 0;
  for (let current = 1; current < Math.max(1, level); current += 1) total += getXpRequiredForNextLevel(current);
  return total;
}

export function getLevelProgress(totalXp: number): LevelProgress {
  let level = 1;
  let remainingXp = Math.max(0, Math.floor(totalXp));
  let required = getXpRequiredForNextLevel(level);
  while (remainingXp >= required) {
    remainingXp -= required;
    level += 1;
    required = getXpRequiredForNextLevel(level);
  }
  return { level, xpIntoLevel: remainingXp, xpToNextLevel: required, progressPercent: Math.min(100, Math.round((remainingXp / required) * 100)) };
}

export function calculateMergeXp(merges: MergeEvent[]): number {
  if (!merges.length) return 0;
  const baseXp = merges.reduce((total, merge) => total + Math.log2(merge.value), 0);
  const comboMultiplier = 1 + Math.min(0.5, Math.max(0, merges.length - 1) * 0.1);
  return Math.round(baseXp * comboMultiplier);
}

export function calculateMilestoneXp(previousHighest: TileValue, nextHighest: TileValue): number {
  let total = 0;
  let milestone = 2 ** Math.max(6, Math.ceil(Math.log2(previousHighest + 1)));
  while (milestone <= nextHighest) {
    total += Math.min(200, 20 + Math.round(Math.log2(milestone) * 10));
    milestone *= 2;
  }
  return total;
}
