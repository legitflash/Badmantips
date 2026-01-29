import type { Tip } from './types';

export const tips: Tip[] = [
  {
    id: '4',
    date: '2026-01-29T12:00:00.000Z',
    match: {
      homeTeam: 'Aston Villa',
      awayTeam: 'Salzburg',
    },
    league: 'UEFA Champions League',
    prediction: 'Aston Villa Win',
    odds: 1.85,
    result: 'Pending',
  },
  {
    id: '1',
    date: '2026-01-28T19:00:00.000Z',
    match: {
      homeTeam: 'Napoli',
      awayTeam: 'Chelsea',
      score: '2:3',
    },
    league: 'UEFA Champions League',
    prediction: 'Chelsea Win',
    odds: 2.10,
    result: 'Won',
  },
];
