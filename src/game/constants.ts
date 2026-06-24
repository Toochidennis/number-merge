import type { TileValue } from './types';

export const COLS = 5;
export const ROWS = 8;
export const INITIAL_GEMS = 500;
export const INITIAL_HIGHEST: TileValue = 16;
export const TILE_VALUES: TileValue[] = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];

export type TileColor = { start: string; end: string; glow: string };

export const TILE_COLORS: Record<number, TileColor> = {
  2: { start: '#28c9ff', end: '#1279ed', glow: '#28c9ff' },
  4: { start: '#ffb338', end: '#f07217', glow: '#ff9b2f' },
  8: { start: '#ff62b6', end: '#ec2878', glow: '#ff4da5' },
  16: { start: '#4ee17b', end: '#13a956', glow: '#39da75' },
  32: { start: '#b16fff', end: '#7135d5', glow: '#9656f5' },
  64: { start: '#e16acb', end: '#a5359b', glow: '#de54c6' },
  128: { start: '#b8ec3b', end: '#63b329', glow: '#aee934' },
  256: { start: '#ff5e6d', end: '#db233f', glow: '#ff485c' },
  512: { start: '#24e4d3', end: '#079b9c', glow: '#2fffee' },
  1024: { start: '#b85cff', end: '#6231dd', glow: '#ae4cff' },
  2048: { start: '#ffe069', end: '#e69715', glow: '#ffd84d' },
  4096: { start: '#ffffff', end: '#ffc72d', glow: '#ffffff' },
  8192: { start: '#ffec8a', end: '#ff7b24', glow: '#ffe06b' },
  16384: { start: '#fff4bd', end: '#e84224', glow: '#ffcb4d' },
  32768: { start: '#ffffff', end: '#b82cff', glow: '#ffffff' },
};

const GENERATED_TILE_COLORS: TileColor[] = [
  { start: '#62f0ff', end: '#1768ff', glow: '#48dfff' },
  { start: '#ffef83', end: '#ff6b2c', glow: '#ffd85c' },
  { start: '#ff83dd', end: '#8a32e8', glow: '#ed70ff' },
  { start: '#7dffaf', end: '#0c9f72', glow: '#55f3a0' },
];

export function getTileColor(value: TileValue): TileColor {
  const defined = TILE_COLORS[value];
  if (defined) return defined;
  const exponent = Math.max(1, Math.round(Math.log2(value)));
  return GENERATED_TILE_COLORS[exponent % GENERATED_TILE_COLORS.length];
}

export const SCORE_UNLOCKS: Array<{ score: number; value: TileValue; weight: number }> = [
  { score: 0, value: 2, weight: 30 },
  { score: 0, value: 4, weight: 25 },
  { score: 0, value: 8, weight: 20 },
  { score: 100, value: 16, weight: 12 },
  { score: 300, value: 32, weight: 8 },
  { score: 800, value: 64, weight: 4 },
  { score: 1500, value: 128, weight: 2 },
  { score: 3000, value: 256, weight: 1 },
  { score: 7000, value: 512, weight: 1 },
  { score: 15000, value: 1024, weight: 1 },
];

export const REWARD_VALUES: Partial<Record<TileValue, number>> = {
  32: 10,
  64: 15,
  128: 20,
  256: 25,
  512: 30,
  1024: 31,
  2048: 50,
  4096: 75,
  8192: 90,
  16384: 110,
  32768: 140,
};
