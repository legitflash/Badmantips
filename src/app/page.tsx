'use client';

import { useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { TodaysTips } from '@/components/tips/todays-tips';
import { HistoryTips } from '@/components/tips/history-tips';
import { WeeklyOdds } from '@/components/tips/weekly-odds';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import type { Tip } from '@/lib/types';
import { isToday, isBefore } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

function HomePageContent({ allTips }: { allTips: Tip[] }) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todaysTips = allTips.filter(tip => isToday(new Date(tip.date)));
    const historyTips = allTips.filter(tip => isBefore(new Date(tip.date), todayStart));
  
    return (
      <>
        <div className="text-center mb-8 bg-card p-6 rounded-lg shadow-sm">
          <p className="text-foreground">
            Badman Tips analyzes and gives out the best football outcome focusing on daily 2 to 5 odds.
          </p>
        </div>

        <WeeklyOdds tips={allTips} />

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
      </>
    );
}


function LoadingSkeleton() {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-16 w-full mb-8" />
        <Skeleton className="h-48 w-full mb-12" />
        <div className="w-full max-w-md mx-auto">
            <Skeleton className="h-10 w-full mb-6" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
        </div>
      </div>
    );
}


export default function Home() {
  const firestore = useFirestore();

  const tipsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'tips'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: tipsFromDb, isLoading } = useCollection<{
    date: Timestamp;
    [key: string]: any;
  }>(tipsQuery);

  const allTips: Tip[] | null = useMemo(() => {
    if (!tipsFromDb) return null;
    return tipsFromDb.map(tip => ({
      ...tip,
      date: tip.date.toDate().toISOString(),
    } as Tip));
  }, [tipsFromDb]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading && <LoadingSkeleton />}
          {!isLoading && allTips && <HomePageContent allTips={allTips} />}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Badman Tips. All rights reserved.</p>
        <p className="mt-2 font-semibold text-accent/80">Gamble responsibly.</p>
      </footer>
    </div>
  );
}
