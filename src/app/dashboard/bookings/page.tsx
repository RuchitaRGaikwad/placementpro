import { Calendar } from 'lucide-react';

export default function BookingsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-2 text-center">
        <Calendar className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-3xl font-bold tracking-tight font-headline">My Bookings</h3>
        <p className="text-lg text-muted-foreground">Coming Soon!</p>
        <p className="text-sm text-muted-foreground">View and manage your scheduled mock interviews.</p>
      </div>
    </div>
  );
}
