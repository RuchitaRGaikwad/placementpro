'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Check,
  FileText,
  Rocket,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/firebase/provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';

const quickLinks = [
  {
    title: 'Review Your Resume',
    description: 'Get instant AI feedback.',
    href: '/dashboard/resume-review',
    icon: FileText,
  },
  {
    title: 'Find a Mentor',
    description: 'Book a mock interview.',
    href: '/dashboard/find-mentor',
    icon: Users,
  },
  {
    title: 'View Bookings',
    description: 'Manage your sessions.',
    href: '/dashboard/bookings',
    icon: CalendarCheck,
  },
  {
    title: 'Explore Resources',
    description: 'Access community guides.',
    href: '/dashboard/resources',
    icon: BookOpen,
  },
];

const recentActivities = [
    {
        description: "Your AI Resume Review for the 'Product Manager' role scored 82%.",
        link: "/dashboard/resume-review/history"
    },
    {
        description: "You booked a mock interview with Priya Singh.",
        link: "/dashboard/bookings"
    },
    {
        description: "You viewed 'Google Interview Experience'.",
        link: "/dashboard/resources/1"
    }
]

export default function DashboardPage() {
  const { user } = useUser();
  const mentorImage = PlaceHolderImages.find((img) => img.id === 'mentor-2');
  const progress = 75;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Welcome back, {user?.displayName?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Let's get you ready for your next opportunity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Mock Interview</CardTitle>
                    <CardDescription>
                    You have an upcoming session. Prepare well!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            {mentorImage && (
                                 <Avatar className='h-12 w-12'>
                                    <AvatarImage src={mentorImage.imageUrl} alt="Priya Singh" />
                                    <AvatarFallback>PS</AvatarFallback>
                                </Avatar>
                            )}
                            <div>
                                <h3 className="font-semibold">System Design Interview</h3>
                                <p className="text-sm text-muted-foreground">with Priya Singh (Google)</p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className="font-semibold">Tomorrow</p>
                            <p className="text-sm text-muted-foreground">4:00 PM</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/bookings">
                            View all bookings <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Prep Toolkit</CardTitle>
                    <CardDescription>
                        Jump right back into your placement preparation journey.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickLinks.map(link => (
                         <Link href={link.href} key={link.title} className="group">
                            <Card className="h-full hover:border-primary hover:bg-muted/50 transition-colors">
                                <CardHeader className='flex-row items-center gap-4 space-y-0'>
                                     <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                        <link.icon className="h-6 w-6" />
                                     </div>
                                     <div>
                                        <CardTitle className="text-base">{link.title}</CardTitle>
                                         <CardDescription>{link.description}</CardDescription>
                                     </div>
                                </CardHeader>
                            </Card>
                         </Link>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Readiness</CardTitle>
                    <CardDescription>Complete these steps to get the most out of PlacementPro.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center justify-center font-bold text-lg text-primary'>{progress}%</div>
                            <Progress value={progress} className='h-20 w-20 rounded-full' style={{
                                clipPath: 'circle(50% at 50% 50%)',
                                transform: 'rotate(-90deg)',
                            }} />
                        </div>
                        <p className='font-medium flex-1'>You're on the right track!</p>
                    </div>
                    <ul className='space-y-3 text-sm'>
                        <li className='flex items-center gap-3 text-muted-foreground'><Check className='w-5 h-5 text-green-500' /><span>Complete Your Profile</span></li>
                        <li className='flex items-center gap-3 text-muted-foreground'><Check className='w-5 h-5 text-green-500' /><span>Upload Your Resume</span></li>
                        <li className='flex items-center gap-3'><div className='w-5 h-5 border-2 border-muted-foreground rounded-full' /><span>Get First Resume Review</span></li>
                        <li className='flex items-center gap-3'><div className='w-5 h-5 border-2 border-muted-foreground rounded-full' /><span>Book a Mock Interview</span></li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className='flex items-start gap-3'>
                            <div className='mt-1 w-2 h-2 rounded-full bg-primary' />
                            <p className='text-sm text-muted-foreground flex-1'>
                                {activity.description} <Link href={activity.link} className='text-primary font-semibold hover:underline'>View</Link>
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
