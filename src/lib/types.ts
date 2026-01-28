export type Tip = {
  id: string;
  date: string; // ISO string for serializability
  match: {
    homeTeam: string;
    awayTeam: string;
  };
  league: string;
  prediction: string;
  confidence: number; // 0-100
  details: string; // This will be the content for the AI
  result?: 'Won' | 'Lost' | 'Pending';
};
