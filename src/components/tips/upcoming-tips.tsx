'use client'

import type { Tip } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TipCard } from './tip-card';
import { format, isToday, isTomorrow } from 'date-fns';

export function UpcomingTips({ tips }: { tips: Tip[] }) {
  const groupedTips = tips.reduce((acc, tip) => {
    const dateStr = format(new Date(tip.date), 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(tip);
    return acc;
  }, {} as Record<string, Tip[]>);
  
  const sortedDates = Object.keys(groupedTips).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (tips.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">No upcoming tips available.</div>
    );
  }
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()) // Adjust for timezone to avoid date shifts
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d');
  }

  return (
    <Accordion type="single" collapsible defaultValue={todayStr} className="w-full space-y-4">
      {sortedDates.map(date => (
        <AccordionItem value={date} key={date} className="border-none rounded-xl bg-card shadow-sm overflow-hidden">
          <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline data-[state=open]:bg-secondary/50">
            <div className="flex items-center gap-4">
              <span className="text-primary">{getDayLabel(date)}</span>
            </div>
            <span className="ml-auto mr-4 text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded-md">{groupedTips[date].length} tips</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 bg-card">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupedTips[date].map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
