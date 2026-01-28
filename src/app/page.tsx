import { Header } from '@/components/layout/header';
import { TodaysTips } from '@/components/tips/todays-tips';
import { UpcomingTips } from '@/components/tips/upcoming-tips';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTips } from '@/lib/data';
import { isToday } from 'date-fns';

export default function Home() {
  const allTips = getTips();

  const todaysTips = allTips.filter(tip => isToday(new Date(tip.date)));
  
  const upcomingTips = allTips.filter(tip => new Date(tip.date) >= new Date(new Date().setHours(0,0,0,0)));

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="today">Today's Tips</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="mt-6">
              <TodaysTips tips={todaysTips} />
            </TabsContent>
            <TabsContent value="upcoming" className="mt-6">
              <UpcomingTips tips={upcomingTips} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Badman Tips. All rights reserved.
      </footer>
    </div>
  );
}
