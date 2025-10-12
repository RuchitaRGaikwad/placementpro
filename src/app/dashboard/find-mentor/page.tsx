import { Users, Star, Briefcase, IndianRupee } from 'lucide-react';
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

const mentors = [
  {
    id: 1,
    name: 'Aditya Sharma',
    company: 'Amazon',
    role: 'SDE II',
    bio: 'Specializing in system design and backend development. Passionate about helping students crack FAANG interviews.',
    expertise: ['System Design', 'Java', 'Microservices'],
    rating: 4.9,
    pricePerSession: 1500,
    imageId: 'mentor-1',
  },
  {
    id: 2,
    name: 'Priya Singh',
    company: 'Google',
    role: 'Product Manager',
    bio: 'Experienced PM with a background in launching successful products. I can help with product sense, case studies, and interview prep.',
    expertise: ['Product Management', 'Case Study', 'UI/UX'],
    rating: 5.0,
    pricePerSession: 2000,
    imageId: 'mentor-2',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    company: 'Microsoft',
    role: 'Data Scientist',
    bio: 'Data scientist with 5+ years of experience in ML and data modeling. Let me help you with your data science career path.',
    expertise: ['Machine Learning', 'Python', 'SQL'],
    rating: 4.8,
    pricePerSession: 1800,
    imageId: 'mentor-3',
  },
];

const getMentorImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

export default function FindMentorPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Users className="w-8 h-8"/> Mentor Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Browse and book premium sessions with top industry professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => {
          const mentorImage = getMentorImage(mentor.imageId);
          return (
             <Card key={mentor.id} className="flex flex-col group hover:border-primary transition-colors">
              <Link href={`/dashboard/find-mentor/${mentor.id}`} className='flex flex-col flex-grow'>
                <CardHeader className="flex-row items-start gap-4">
                  {mentorImage && (
                    <Image
                      src={mentorImage.imageUrl}
                      alt={mentor.name}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-primary"
                      data-ai-hint={mentorImage.imageHint}
                    />
                  )}
                  <div className="flex-grow">
                    <CardTitle>{mentor.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {mentor.role} at {mentor.company}
                    </CardDescription>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{mentor.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Link>
               <CardFooter className="flex items-center justify-between">
                <div className="font-bold flex items-center">
                    <IndianRupee className='h-5 w-5' />
                    {mentor.pricePerSession}
                    <span className='text-sm font-normal text-muted-foreground'>/session</span>
                </div>
                 <Button asChild>
                    <Link href={`/dashboard/find-mentor/${mentor.id}`}>Book Session</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
