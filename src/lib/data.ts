import type { Tip } from './types';
import { subDays, formatISO } from 'date-fns';

const today = new Date();

export const tips: Tip[] = [
  {
    id: '4',
    date: formatISO(today),
    match: {
      homeTeam: 'Aston Villa',
      awayTeam: 'Salzburg',
    },
    league: 'Club Friendly',
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
  {
    id: '2',
    date: formatISO(subDays(today, 2)),
    match: {
      homeTeam: 'Man City',
      awayTeam: 'Liverpool',
    },
    league: 'Premier League',
    prediction: 'Over 2.5 Goals',
    odds: 10.5,
    result: 'Pending',
  },
  {
    id: '3',
    date: formatISO(subDays(today, 8)),
    match: {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
    },
    league: 'La Liga',
    prediction: 'Draw',
    odds: 12.0,
    result: 'Lost',
  },
];
