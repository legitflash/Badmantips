'use client';

import { useMemo, useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { TodaysTips } from '@/components/tips/todays-tips';
import { HistoryTips } from '@/components/tips/history-tips';
import { WeeklyOdds } from '@/components/tips/weekly-odds';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tips } from '@/lib/data';
import type { Tip } from '@/lib/types';
import { isToday, isBefore, compareDesc } from 'date-fns';

function HomePageContent({ allTips }: { allTips: Tip[] }) {
    const [todaysTips, setTodaysTips] = useState<Tip[]>([]);
    const [historyTips, setHistoryTips] = useState<Tip[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // This effect runs only on the client, after hydration
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        setTodaysTips(allTips.filter(tip => isToday(new Date(tip.date))));
        setHistoryTips(allTips.filter(tip => isBefore(new Date(tip.date), todayStart)));
        setIsClient(true);
    }, [allTips]);
  
    return (
      <>
        <div className="text-center mb-8 bg-card p-6 rounded-lg shadow-sm">
          <p className="text-foreground">
            Badman Tips analyzes and gives out the best football outcome focusing on daily 2 to 5 odds.
          </p>
        </div>

        <WeeklyOdds tips={allTips} />

        {isClient ? (
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="today">Today's Tips</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="mt-6">
              <TodaysTips tips={todaysTips} />
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <HistoryTips tips={historyTips} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="w-full text-center p-12">
            {/* You could add a loading spinner here */}
          </div>
        )}
      </>
    );
}


export default function Home() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const allTips: Tip[] = useMemo(() => {
    // We sort the tips by date here to ensure consistency, like the previous database query did.
    // Using compareDesc for descending order (newest first).
    return [...tips].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <HomePageContent allTips={allTips} />
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        {year && <p>© {year} Badman Tips. All rights reserved.</p>}
        <p className="mt-2 font-semibold text-accent/80">Gamble responsibly.</p>
      </footer>
    </div>
  );
}
