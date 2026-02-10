'use client';

import { useMemo, useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { TodaysTips } from '@/components/tips/todays-tips';
import { HistoryTips } from '@/components/tips/history-tips';
import { WeeklyOdds } from '@/components/tips/weekly-odds';
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

        {isClient ? (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-4 text-primary">Today's Tips</h2>
              <TodaysTips tips={todaysTips} />
            </div>

            <WeeklyOdds tips={allTips} />
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-4 text-primary">History</h2>
              <HistoryTips tips={historyTips} />
            </div>
          </>
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
