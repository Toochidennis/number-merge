import type { MilestoneInfo, TileValue } from './types';

export const MILESTONE_RETIREMENTS: ReadonlyArray<{ milestone: TileValue; retired: TileValue }> = [
  { milestone: 512, retired: 2 },
  { milestone: 2048, retired: 4 },
  { milestone: 4096, retired: 8 },
  { milestone: 8192, retired: 16 },
  { milestone: 16384, retired: 32 },
  { milestone: 32768, retired: 64 },
];

// Goals the player works toward, starting from the very first game.
export const MILESTONE_GOALS = [64, 128, 256, 512, 1024, 2048, 4096, 8192] as const;

// Derive the current goal from the highest block ever made.
export function getCurrentGoal(highest: number): number {
  return MILESTONE_GOALS.find((g) => g > highest) ?? highest * 2;
}

// Weighted spawn pool derived from the lowest non-retired tile.
// A 3-value window weighted toward the smallest value; scales infinitely and
// can never include a retired tile, so it stays consistent with retirement.
export function getSpawnPool(retiredValues: TileValue[]): TileValue[] {
  const min = getMinimumSpawnValue(retiredValues);
  return [min, min, min, min * 2, min * 2, min * 4];
}

export function getRandomSpawnValue(
  retiredValues: TileValue[],
  excludedValues: TileValue[] = [],
  random = Math.random,
): TileValue {
  // Always exclude retired tiles — a retired number can never reappear.
  const base = getSpawnPool(retiredValues).filter((v) => !retiredValues.includes(v));
  const filtered = base.filter((v) => !excludedValues.includes(v));
  const pick = filtered.length ? filtered : (base.length ? base : [getMinimumSpawnValue(retiredValues)]);
  return pick[Math.floor(random() * pick.length)];
}

export function getMilestoneReward(value: number): number {
  return Math.max(5, Math.floor(Math.log2(value)));
}

export function getMilestoneInfo(value: TileValue): MilestoneInfo | null {
  const entry = MILESTONE_RETIREMENTS.find(({ milestone }) => milestone === value);
  if (entry) return { current: value, retired: entry.retired, next: value * 2 };
  // From 65,536 onward, every doubled milestone retires the next lowest value.
  if (value >= 65536 && Number.isInteger(Math.log2(value))) {
    return { current: value, retired: value / 512, next: value * 2 };
  }
  return null;
}

export function getRetiredValuesForHighest(highest: TileValue): TileValue[] {
  const retired = MILESTONE_RETIREMENTS
    .filter(({ milestone }) => milestone <= highest)
    .map(({ retired }) => retired);
  for (let milestone = 65536; milestone <= highest; milestone *= 2) {
    retired.push(milestone / 512);
  }
  return retired;
}

// Returns the next milestone goal (used for the GOAL strip and crown logic).
export function getNextMilestone(highest: TileValue): number {
  return getCurrentGoal(highest);
}

export function getCurrentMilestone(highest: TileValue): TileValue | null {
  return highest >= MILESTONE_GOALS[0] ? highest : null;
}

export function getMinimumSpawnValue(retiredValues: TileValue[]): TileValue {
  let value = 2;
  while (retiredValues.includes(value)) value *= 2;
  return value;
}
