import type { Tip } from './types';
import { addDays, formatISO, startOfMonth, getDaysInMonth, isBefore } from 'date-fns';

const teams = ["Crimson Vipers", "Azure Dragons", "Golden Griffins", "Shadow Wolves", "Emerald Serpents", "Steel Sentinels", "Titanium Titans", "Onyx Outlaws", "Solar Flares", "Arctic Avengers"];
const leagues = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Champions League"];
const predictions = ["Home Win", "Away Win", "Draw", "Over 2.5 Goals", "Both Teams to Score"];

const goodDetails = [
  "Both teams have strong attacking lineups but have shown defensive vulnerabilities in recent matches. Expect an open game with goals from both sides. Key player for the home team is returning from injury.",
  "The away team is in excellent form, winning their last 5 matches. The home team has struggled for consistency. The away team's solid defense should see them through with a narrow victory.",
  "A classic derby match. Form goes out the window in these games. It will be a tight, cagey affair with few clear-cut chances. A draw seems the most likely outcome, possibly a low-scoring one.",
  "The home team scores an average of 2.5 goals per game at home. The away team has a leaky defense, conceding frequently on their travels. This points towards a high-scoring game, likely exceeding 2.5 goals.",
];

const badDetails = [
  "Home team good. Away team bad.",
  "I think over 2.5 goals.",
  "Match tomorrow. Win.",
  "", // Empty details
  "Prediction: Home Win. Confidence: High.", // Redundant, not insightful
];

export function getTips(): Tip[] {
  const tips: Tip[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = startOfMonth(today);
  const daysInMonth = getDaysInMonth(today);

  for (let i = 0; i < daysInMonth; i++) {
    const date = addDays(firstDayOfMonth, i);
    const numTipsForDay = Math.floor(Math.random() * 4) + 1; // 1 to 4 tips per day

    for (let j = 0; j < numTipsForDay; j++) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      let awayTeam = teams[Math.floor(Math.random() * teams.length)];
      while (homeTeam === awayTeam) {
        awayTeam = teams[Math.floor(Math.random() * teams.length)];
      }

      // 70% chance of good details, 30% bad
      const useGoodDetails = Math.random() < 0.7;
      const details = useGoodDetails
        ? goodDetails[Math.floor(Math.random() * goodDetails.length)]
        : badDetails[Math.floor(Math.random() * badDetails.length)];

      const tip: Tip = {
        id: `tip-${i}-${j}-${Date.now()}`,
        date: formatISO(date),
        league: leagues[Math.floor(Math.random() * leagues.length)],
        match: { homeTeam, awayTeam },
        prediction: predictions[Math.floor(Math.random() * predictions.length)],
        confidence: Math.floor(Math.random() * 50) + 50, // 50-99
        details: details,
        result: isBefore(date, today) ? (Math.random() > 0.5 ? 'Won' : 'Lost') : 'Pending',
      };
      tips.push(tip);
    }
  }

  return tips;
}
