'use client';

import type { Tip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, CircleDashed, Flame, Trophy, XCircle } from 'lucide-react';
import { format } from 'date-fns';

function ResultBadge({ result }: { result: Tip['result'] }) {
  if (result === 'Won') {
    return <Badge className="border-transparent bg-green-600 text-primary-foreground hover:bg-green-600/80"><Trophy className="mr-1 h-3 w-3" /> Won</Badge>;
  }
  if (result === 'Lost') {
    return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Lost</Badge>;
  }
  return <Badge variant="secondary"><CircleDashed className="mr-1 h-3 w-3" /> Pending</Badge>;
}

export function TipCard({ tip }: { tip: Tip }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardDescription className="flex items-center gap-2 text-xs">
            <Calendar className="h-4 w-4" />
            {format(new Date(tip.date), 'MMM d, yyyy')}
          </CardDescription>
          <ResultBadge result={tip.result} />
        </div>
        <CardTitle className="text-base font-normal">{tip.league}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-6">
        <div className="space-y-1 text-center text-lg font-semibold">
          <p>{tip.match.homeTeam}</p>
          <p className="text-sm font-normal text-muted-foreground">vs</p>
          <p>{tip.match.awayTeam}</p>
        </div>
        <div className="mt-4 rounded-lg bg-secondary/30 p-3 text-center">
          <p className="text-sm text-muted-foreground">Prediction</p>
          <p className="text-xl font-bold text-primary">{tip.prediction}</p>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-accent" />
            <span>Odds: {tip.odds}</span>
        </div>
      </CardContent>
    </Card>
  );
}
