import { Swords } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Swords className="h-8 w-8" />
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Badman Tips</h1>
        </div>
        <p className="hidden text-sm text-primary-foreground/80 md:block">
          Your daily dose of winning predictions.
        </p>
      </div>
    </header>
  );
}
