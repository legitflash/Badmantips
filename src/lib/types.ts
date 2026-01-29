export type Tip = {
  id: string;
  date: string; // ISO string for serializability
  match: {
    homeTeam: string;
    awayTeam: string;
  };
  league: string;
  prediction: string;
  odds: number;
  result?: 'Won' | 'Lost' | 'Pending';
};
