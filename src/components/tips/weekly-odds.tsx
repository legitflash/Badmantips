'use client';

import type { Tip } from '@/lib/types';
import { TipCard } from '@/components/tips/tip-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { startOfWeek, endOfWeek, subWeeks, isWithinInterval } from 'date-fns';
import { useState, useEffect } from 'react';
import { CalendarRange } from 'lucide-react';

export function WeeklyOdds({ tips }: { tips: Tip[] }) {
  const [thisWeekTips, setThisWeekTips] = useState<Tip[]>([]);
  const [lastWeekTips, setLastWeekTips] = useState<Tip[]>([]);

  useEffect(() => {
    const today = new Date();
    // Use { weekStartsOn: 1 } to set Monday as the start of the week
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
    const startOfLastWeek = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });

    const highOddsTips = tips.filter(tip => tip.odds >= 10);

    setThisWeekTips(
      highOddsTips.filter(tip =>
        isWithinInterval(new Date(tip.date), { start: startOfThisWeek, end: endOfThisWeek })
      ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );
    setLastWeekTips(
      highOddsTips.filter(tip =>
        isWithinInterval(new Date(tip.date), { start: startOfLastWeek, end: endOfLastWeek })
      ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    );
  }, [tips]);
  
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center mt-6">
      <CalendarRange className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No Weekly Tips</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">Weekly 10+ Odds</h2>
      <Tabs defaultValue="this-week" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="last-week">Last Week</TabsTrigger>
        </TabsList>
        <TabsContent value="this-week" className="mt-6">
          {thisWeekTips.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {thisWeekTips.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          ) : (
            <EmptyState message="No high-odds tips found for this week." />
          )}
        </TabsContent>
        <TabsContent value="last-week" className="mt-6">
          {lastWeekTips.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lastWeekTips.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          ) : (
            <EmptyState message="No high-odds tips found from last week." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
