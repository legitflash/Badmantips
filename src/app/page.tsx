import { Header } from '@/components/layout/header';
import { TodaysTips } from '@/components/tips/todays-tips';
import { HistoryTips } from '@/components/tips/history-tips';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTips } from '@/lib/data';
import { isToday, isBefore } from 'date-fns';

export default function Home() {
  const allTips = getTips();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todaysTips = allTips.filter(tip => isToday(new Date(tip.date)));
  
  const historyTips = allTips.filter(tip => isBefore(new Date(tip.date), todayStart));

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-8 bg-card p-6 rounded-lg shadow-sm">
            <p className="text-foreground">
              Badman Tips analyzes and gives out the best football outcome focusing on daily 2 to 5 odds.
            </p>
          </div>
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
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Badman Tips. All rights reserved.</p>
        <p className="mt-2 font-semibold text-accent/80">Gamble responsibly.</p>
      </footer>
    </div>
  );
}
