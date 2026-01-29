'use client'

import type { Tip } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TipCard } from './tip-card';
import { format, isYesterday } from 'date-fns';
import { Archive } from 'lucide-react';

export function HistoryTips({ tips }: { tips: Tip[] }) {
  const groupedTips = tips.reduce((acc, tip) => {
    const dateStr = format(new Date(tip.date), 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(tip);
    return acc;
  }, {} as Record<string, Tip[]>);
  
  const sortedDates = Object.keys(groupedTips).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (tips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center mt-6">
        <Archive className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Tip History</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          There are no past tips from this month to display yet.
        </p>
      </div>
    );
  }

  const getDayLabel = (dateStr: string) => {
    // By appending T00:00:00, we ensure the date is parsed in the local timezone, not UTC.
    const date = new Date(`${dateStr}T00:00:00`);
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMMM d');
  }

  return (
    <Accordion type="single" collapsible defaultValue={sortedDates[0]} className="w-full space-y-4">
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
