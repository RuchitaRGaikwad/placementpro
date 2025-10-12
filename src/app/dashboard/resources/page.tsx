import { BookOpen } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-2 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-3xl font-bold tracking-tight font-headline">Resource Library</h3>
        <p className="text-lg text-muted-foreground">Coming Soon!</p>
        <p className="text-sm text-muted-foreground">Access interview experiences, questions, and guides.</p>
      </div>
    </div>
  );
}
