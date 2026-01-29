import type { Tip } from './types';
import tipsData from './tips.json';

const tips: Tip[] = tipsData as Tip[];

export function getTips(): Tip[] {
  return tips;
}
