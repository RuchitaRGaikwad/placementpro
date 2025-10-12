
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  IndianRupee,
  ListChecks,
  User,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock data
const bootcamps = [
  {
    id: 1,
    title: 'Advanced System Design',
    instructor: 'Priya Singh',
    description:
      'This bootcamp offers a comprehensive exploration of system design principles essential for developing large-scale, resilient applications. Participants will delve into topics such as scalability, microservices architecture, distributed systems, caching strategies, and database design. The course includes hands-on sessions where you will design real-world systems like a social media feed, a ride-sharing service, and a distributed message queue. By the end of this bootcamp, you will have the confidence to tackle complex system design interview questions and architect robust solutions in your professional projects.',
    schedule: 'Mon, Wed, Fri @ 7 PM IST',
    price: 4999,
    category: 'System Design',
    imageUrlId: 'feature-bootcamps',
    curriculum: [
      'Introduction to System Design',
      'Scalability & Performance',
      'Microservices vs. Monoliths',
      'Caching Techniques',
      'Database Design (SQL vs NoSQL)',
      'Designing a URL Shortener',
      'Designing a Social Media Feed',
      'Q&A with Industry Experts',
    ],
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    instructor: 'Rohan Verma',
    description:
      'A deep dive into essential DSA for top-tier company interviews. Includes hands-on coding sessions and practice problems from FAANG companies.',
    schedule: 'Tue, Thu, Sat @ 8 PM IST',
    price: 3999,
    category: 'DSA',
    imageUrlId: 'dsa-book-cover',
    curriculum: [
      'Arrays & Strings',
      'Linked Lists, Stacks & Queues',
      'Trees & Graphs',
      'Heaps & Hashing',
      'Dynamic Programming',
      'Greedy Algorithms',
      'Backtracking & Recursion',
      'Mock Coding Interviews',
    ],
  },
  {
    id: 3,
    title: 'Product Management Fundamentals',
    instructor: 'Aditya Sharma',
    description:
      'Learn the A-Z of product management, from ideation to launch. Taught by a seasoned PM from Google.',
    schedule: 'Weekends @ 11 AM IST',
    price: 5999,
    category: 'Product Management',
    imageUrlId: 'pm-bootcamp',
    curriculum: [
      'The Role of a PM',
      'Product Strategy & Vision',
      'User Research & Personas',
      'PRDs & Roadmapping',
      'Agile & Scrum Methodologies',
      'Product Launch & Go-to-Market',
      'Metrics & A/B Testing',
      'Crafting Your PM Resume',
    ],
  },
];

const getBootcampImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

export default function BootcampDetailPage({
  params,
}: {
  params: { bootcampId: string };
}) {
  const bootcamp = bootcamps.find(b => b.id.toString() === params.bootcampId);

  if (!bootcamp) {
    notFound();
  }

  const image = getBootcampImage(bootcamp.imageUrlId);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/bootcamps">
            <ArrowLeft />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {image && (
            <div className="relative h-80 w-full">
              <Image
                src={image.imageUrl}
                alt={bootcamp.title}
                fill
                className="object-cover rounded-lg shadow-lg"
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
          <Card>
            <CardHeader>
              <Badge variant="secondary" className='w-fit mb-2'>{bootcamp.category}</Badge>
              <CardTitle className="text-4xl font-headline">
                {bootcamp.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {bootcamp.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <ListChecks className='w-6 h-6' />
                    What You'll Learn
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3'>
                    {bootcamp.curriculum.map(item => (
                        <li key={item} className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-primary rounded-full' />
                            <span className='text-muted-foreground'>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <p className="text-3xl font-bold font-headline flex items-center">
                <IndianRupee className="h-7 w-7" />
                {bootcamp.price}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button size="lg" className='w-full'>Enroll Now</Button>
                <div className='space-y-3 pt-4'>
                    <div className="flex items-center text-sm">
                        <User className="mr-3 h-5 w-5 text-primary" />
                        <span className='font-semibold mr-2'>Instructor:</span>
                        <span className='text-muted-foreground'>{bootcamp.instructor}</span>
                    </div>
                     <div className="flex items-center text-sm">
                        <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                        <span className='font-semibold mr-2'>Schedule:</span>
                         <span className='text-muted-foreground'>{bootcamp.schedule}</span>
                    </div>
                     <div className="flex items-center text-sm">
                        <Clock className="mr-3 h-5 w-5 text-primary" />
                         <span className='font-semibold mr-2'>Duration:</span>
                         <span className='text-muted-foreground'>4 Weeks</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Video className="mr-3 h-5 w-5 text-primary" />
                         <span className='font-semibold mr-2'>Format:</span>
                         <span className='text-muted-foreground'>Live Online Sessions</span>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
