import { Users } from 'lucide-react';

export default function FindMentorPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-2 text-center">
        <Users className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-3xl font-bold tracking-tight font-headline">Mentor Marketplace</h3>
        <p className="text-lg text-muted-foreground">Coming Soon!</p>
        <p className="text-sm text-muted-foreground">Browse and book sessions with top industry professionals.</p>
      </div>
    </div>
  );
}
