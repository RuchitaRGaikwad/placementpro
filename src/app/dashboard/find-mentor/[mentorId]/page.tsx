'use client';
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
  Briefcase,
  Calendar,
  IndianRupee,
  MessageSquare,
  Star,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data - in a real app, you'd fetch this based on params.mentorId
const mentor = {
  id: 1,
  name: 'Aditya Sharma',
  company: 'Amazon',
  role: 'SDE II',
  bio: 'Specializing in system design and backend development, I have over 5 years of experience building scalable and resilient systems at Amazon. I am passionate about mentoring and have a track record of helping students land offers at top-tier companies by focusing on strong fundamentals, clear communication, and practical problem-solving. My approach involves a mix of theory, real-world examples, and hands-on mock interviews.',
  expertise: ['System Design', 'Java', 'Microservices', 'AWS', 'Backend Architecture'],
  rating: 4.9,
  pricePerSession: 1500,
  imageId: 'mentor-1',
  reviews: [
    {
      id: 1,
      studentName: 'Priya Patel',
      studentImageId: 'mentor-2',
      rating: 5,
      comment:
        "Aditya's session was a game-changer. His insights into system design are unparalleled. He broke down complex topics into understandable chunks. Highly recommended!",
    },
    {
      id: 2,
      studentName: 'Rohan Kumar',
      studentImageId: 'mentor-3',
      rating: 5,
      comment:
        'The mock interview was incredibly realistic. Aditya pointed out exactly where my explanations were weak and gave me a framework to improve. I feel much more confident now.',
    },
  ],
};

const getMentorImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

export default function MentorDetailPage({
  params,
}: {
  params: { mentorId: string };
}) {
  const mentorImage = getMentorImage(mentor.imageId);

  return (
    <div className="space-y-8">
      <div className='flex items-center gap-4'>
        <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/find-mentor">
                <ArrowLeft />
            </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Mentor Profile</h1>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-col md:flex-row items-start gap-6">
              {mentorImage && (
                <Image
                  src={mentorImage.imageUrl}
                  alt={mentor.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-primary shadow-md"
                  data-ai-hint={mentorImage.imageHint}
                />
              )}
              <div className="flex-grow space-y-2">
                <CardTitle className="text-3xl font-headline">
                  {mentor.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <Briefcase className="h-5 w-5 text-primary" />
                  {mentor.role} at {mentor.company}
                </CardDescription>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-lg">{mentor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({mentor.reviews.length} reviews)
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">About Me</h3>
              <p className="text-muted-foreground">{mentor.bio}</p>
              <h3 className="font-semibold text-lg mt-6 mb-2">
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6" /> Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mentor.reviews.map((review) => {
                const studentImage = getMentorImage(review.studentImageId);
                return (
                  <div key={review.id} className="flex gap-4">
                    {studentImage && (
                        <Image
                        src={studentImage.imageUrl}
                        alt={review.studentName}
                        width={40}
                        height={40}
                        className="rounded-full mt-1"
                        data-ai-hint={studentImage.imageHint}
                        />
                    )}
                    <div className='flex-1'>
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{review.studentName}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Book a Session</span>
                <span className="font-bold text-2xl flex items-center">
                  <IndianRupee className="h-6 w-6" />
                  {mentor.pricePerSession}
                </span>
              </CardTitle>
              <CardDescription>
                Select a date and time for your mock interview.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center p-4 border rounded-md">
                 {/* In a real app, a calendar component would go here */}
                 <Calendar className='w-full'/>
              </div>
              <Button size="lg" className="w-full">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
