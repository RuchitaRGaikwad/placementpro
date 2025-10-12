import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  {
    title: 'Mock Interviews',
    value: '3',
    description: 'Completed this month',
    icon: <CalendarCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Resume Score',
    value: '88%',
    description: 'Latest AI analysis',
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Resources Viewed',
    value: '12',
    description: 'New articles and guides',
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Profile Activity',
    value: 'High',
    description: 'Keep up the great work!',
    icon: <Activity className="h-6 w-6 text-primary" />,
  },
];

const quickLinks = [
    { title: 'Review Your Resume', href: '/dashboard/resume-review', icon: FileText },
    { title: 'Find a Mentor', href: '/dashboard/find-mentor', icon: Activity },
    { title: 'View Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
    { title: 'Explore Resources', href: '/dashboard/resources', icon: BookOpen },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s a summary of your placement preparation journey.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Mock Interview</CardTitle>
            <CardDescription>
              You have an upcoming session. Prepare well!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h3 className="font-semibold">System Design Interview</h3>
                    <p className="text-sm text-muted-foreground">with Priya Singh (Google)</p>
                </div>
                <div>
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
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                    Jump right back into your prep.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {quickLinks.map(link => (
                    <Button key={link.title} variant="outline" className="h-20 flex-col justify-center gap-2" asChild>
                        <Link href={link.href}>
                            <link.icon className="h-6 w-6 text-primary" />
                            <span className="text-sm font-medium text-center">{link.title}</span>
                        </Link>
                    </Button>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
