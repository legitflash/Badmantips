import type { Tip } from '@/lib/types';
import { TipCard } from './tip-card';
import { Trophy } from 'lucide-react';

export function TodaysTips({ tips }: { tips: Tip[] }) {
  if (tips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center mt-6">
        <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No Tips for Today</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The braintrust is resting. Check back tomorrow for new predictions!
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tips.map(tip => (
        <TipCard key={tip.id} tip={tip} />
      ))}
    </div>
  );
}
