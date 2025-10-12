import { GraduationCap, Clock, BarChart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const bootcamps = [
  {
    id: 1,
    title: 'Advanced System Design',
    instructor: 'Priya Singh',
    description:
      'Master system design concepts for large-scale applications. Covers scalability, microservices, and more.',
    schedule: 'Mon, Wed, Fri @ 7 PM IST',
    price: 4999,
    category: 'System Design',
    imageUrlId: 'feature-bootcamps',
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    instructor: 'Rohan Verma',
    description:
      'A deep dive into essential DSA for top-tier company interviews. Includes hands-on coding sessions.',
    schedule: 'Tue, Thu, Sat @ 8 PM IST',
    price: 3999,
    category: 'DSA',
    imageUrlId: 'dsa-bootcamp',
  },
  {
    id: 3,
    title: 'Product Management Fundamentals',
    instructor: 'Aditya Sharma',
    description:
      'Learn the A-Z of product management, from ideation to launch. Taught by a seasoned PM.',
    schedule: 'Weekends @ 11 AM IST',
    price: 5999,
    category: 'Product Management',
    imageUrlId: 'pm-bootcamp',
  },
];

const getBootcampImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

export default function BootcampsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <GraduationCap className="w-8 h-8" /> Exclusive Bootcamps
        </h1>
        <p className="text-muted-foreground mt-2">
          Enroll in expert-led bootcamps to fast-track your skills and career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bootcamps.map((bootcamp) => {
          const image = getBootcampImage(bootcamp.imageUrlId);
          return (
            <Card key={bootcamp.id} className="flex flex-col group hover:border-primary transition-colors">
              <Link href={`/dashboard/bootcamps/${bootcamp.id}`} className='flex flex-col flex-grow'>
                {image && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={image.imageUrl}
                      alt={bootcamp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{bootcamp.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{bootcamp.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {bootcamp.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-2 h-4 w-4" />
                    <span>{bootcamp.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{bootcamp.schedule}</span>
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="flex items-center justify-between">
                <p className="text-xl font-bold font-headline">
                  ₹{bootcamp.price}
                </p>
                <Button asChild>
                    <Link href={`/dashboard/bootcamps/${bootcamp.id}`}>Enroll Now</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
