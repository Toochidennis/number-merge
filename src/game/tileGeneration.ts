import type { TileValue } from './types';
import { getCurrentGoal } from './milestones';

export interface WeightedTile {
  value: TileValue;
  weight: number;
}

export function getActiveTilePool(highestBlock: number): TileValue[] {
  if (highestBlock >= 8192) {
    const progressionSteps = Math.max(0, Math.floor(Math.log2(highestBlock / 8192)));
    const lowestActiveValue = 32 * (2 ** progressionSteps);
    return Array.from({ length: 6 }, (_, index) => lowestActiveValue * (2 ** index));
  }
  if (highestBlock >= 4096) return [16, 32, 64, 128, 256, 512];
  if (highestBlock >= 2048) return [8, 16, 32, 64, 128, 256];
  if (highestBlock >= 1024) return [4, 8, 16, 32, 64, 128];
  if (highestBlock >= 512) return [4, 8, 16, 32, 64];
  if (highestBlock >= 256) return [2, 4, 8, 16, 32];
  if (highestBlock >= 128) return [2, 4, 8, 16];
  return [2, 4, 8];
}

export function getWeightedTilePool(highestBlock: number): WeightedTile[] {
  const milestoneTarget = getCurrentGoal(highestBlock);
  // Milestone targets must be earned through merging, never injected directly.
  const pool = getActiveTilePool(highestBlock).filter((value) => value < milestoneTarget);
  let weights: number[];

  if (highestBlock >= 2048) {
    weights = [24, 24, 20, 16, 11, 5];
  } else if (highestBlock >= 1024) {
    // Keep 4 available, but deliberately make it less common than 8 and 16.
    weights = [10, 25, 23, 19, 15, 8];
  } else if (pool.length === 5) {
    weights = [30, 27, 21, 15, 7];
  } else if (pool.length === 4) {
    weights = [34, 30, 23, 13];
  } else {
    weights = [40, 35, 25];
  }

  return pool.map((value, index) => ({ value, weight: weights[index] ?? 1 }));
}

export function generateWeightedTile(
  highestBlock: number,
  random = Math.random,
  excludedValues: TileValue[] = [],
): TileValue {
  const weightedPool = getWeightedTilePool(highestBlock);
  const filteredPool = weightedPool.filter(({ value }) => !excludedValues.includes(value));
  const candidates = filteredPool.length ? filteredPool : weightedPool;
  const totalWeight = candidates.reduce((total, entry) => total + entry.weight, 0);
  let roll = random() * totalWeight;

  for (const entry of candidates) {
    roll -= entry.weight;
    if (roll <= 0) return entry.value;
  }

  return candidates[candidates.length - 1].value;
}
