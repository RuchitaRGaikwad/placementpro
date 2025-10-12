
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, Video, XCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const bookings = [
  {
    id: 1,
    mentorName: 'Priya Singh',
    mentorRole: 'Product Manager, Google',
    mentorImageId: 'mentor-2',
    sessionType: 'System Design Interview',
    date: '2024-08-15T16:00:00.000Z',
    status: 'upcoming',
    videoLink: '#',
  },
  {
    id: 2,
    mentorName: 'Aditya Sharma',
    mentorRole: 'SDE II, Amazon',
    mentorImageId: 'mentor-1',
    sessionType: 'Behavioral Interview Prep',
    date: '2024-07-28T11:00:00.000Z',
    status: 'completed',
    videoLink: '#',
  },
  {
    id: 3,
    mentorName: 'Rohan Verma',
    mentorRole: 'Data Scientist, Microsoft',
    mentorImageId: 'mentor-3',
    sessionType: 'Data Science Case Study',
    date: '2024-07-20T18:30:00.000Z',
    status: 'cancelled',
    videoLink: '#',
  },
];

const getMentorImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

const BookingCard = ({ booking }: { booking: (typeof bookings)[0] }) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const sessionDate = new Date(booking.date);
    setFormattedDate(sessionDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    setFormattedTime(sessionDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }));
  }, [booking.date]);


  const mentorImage = getMentorImage(booking.mentorImageId);

  const StatusBadge = () => {
    switch (booking.status) {
      case 'upcoming':
        return <div className="flex items-center text-sm text-blue-500"><Calendar className="mr-2 h-4 w-4" />Upcoming</div>;
      case 'completed':
        return <div className="flex items-center text-sm text-green-500"><CheckCircle className="mr-2 h-4 w-4" />Completed</div>;
      case 'cancelled':
        return <div className="flex items-center text-sm text-red-500"><XCircle className="mr-2 h-4 w-4" />Cancelled</div>;
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          {mentorImage && (
            <Image
              src={mentorImage.imageUrl}
              alt={booking.mentorName}
              width={60}
              height={60}
              className="rounded-full"
              data-ai-hint={mentorImage.imageHint}
            />
          )}
          <div>
            <CardTitle>{booking.sessionType}</CardTitle>
            <CardDescription>with {booking.mentorName} ({booking.mentorRole})</CardDescription>
          </div>
        </div>
        <div className='text-right'>
           <StatusBadge />
           {formattedDate ? (
            <>
              <p className='text-sm text-muted-foreground'>{formattedDate}</p>
              <p className='text-sm text-muted-foreground'>{formattedTime}</p>
            </>
           ) : (
            <div className="space-y-1 mt-2">
                <div className="h-4 w-48 bg-muted rounded-md animate-pulse"></div>
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse ml-auto"></div>
            </div>
           )}
        </div>
      </CardHeader>
      <CardContent className="flex justify-end items-center gap-2">
        {booking.status === 'upcoming' && (
          <>
            <Button variant="outline">Reschedule</Button>
            <Button><Video className="mr-2 h-4 w-4" /> Join Call</Button>
          </>
        )}
        {booking.status === 'completed' && (
           <Button variant="outline">Leave a Review</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status !== 'upcoming');


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Calendar className="w-8 h-8" /> My Bookings
        </h1>
        <p className="text-muted-foreground mt-2">
          View and manage your scheduled mock interviews.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className='grid w-full grid-cols-2 max-w-md'>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className='mt-6'>
          <Card>
            <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Here are your scheduled mock interviews. Prepare well!</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {upcomingBookings.length > 0 ? (
                    upcomingBookings.map(b => <BookingCard key={b.id} booking={b} />)
                ) : (
                    <p className='text-muted-foreground text-center py-8'>No upcoming bookings.</p>
                )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past" className='mt-6'>
           <Card>
            <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
                <CardDescription>Review your completed or cancelled mock interviews.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {pastBookings.length > 0 ? (
                     pastBookings.map(b => <BookingCard key={b.id} booking={b} />)
                ) : (
                    <p className='text-muted-foreground text-center py-8'>No past bookings.</p>
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
