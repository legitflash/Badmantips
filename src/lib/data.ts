import type { Tip } from './types';

export const tips: Tip[] = [
  {
    id: '5',
    date: '2026-02-05T12:00:00.000Z',
    match: {
      homeTeam: 'Real Betis',
      awayTeam: 'Atletico Madrid',
      score: '0:5',
    },
    league: 'La Liga',
    prediction: 'Atletico Madrid Win',
    odds: 2,
    result: 'Won',
  },
  {
    id: '4',
    date: '2026-01-29T12:00:00.000Z',
    match: {
      homeTeam: 'Aston Villa',
      awayTeam: 'Salzburg',
      score: '3:2',
    },
    league: 'UEFA Champions League',
    prediction: 'Aston Villa Win',
    odds: 1.85,
    result: 'Won',
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
