
'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ArrowRight,
  Bot,
  GraduationCap,
  LayoutDashboard,
  Users,
  CheckCircle,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { useUser } from '@/firebase/provider';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Resume Review',
    description:
      'Get instant, detailed feedback on your resume against any job description. Our AI highlights keywords, suggests improvements, and gives you a match score to optimize your applications.',
    imageId: 'feature-resume-review',
    imageHint: 'resume review',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: '1-on-1 Mentorship',
    description:
      'Connect with industry experts from top-tier companies. Book mock interviews, get career advice, and build your network with personalized guidance from seasoned professionals.',
    imageId: 'feature-mentors',
    imageHint: 'mentor guidance',
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: 'Exclusive Bootcamps',
    description:
      'Enroll in live, cohort-based bootcamps on in-demand skills like System Design, DSA, and Product Management. Learn from the best and accelerate your career growth.',
    imageId: 'feature-bootcamps',
    imageHint: 'online bootcamp',
  },
];

const whyChooseUsPoints = [
    {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        text: "Comprehensive tools for end-to-end placement preparation."
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        text: "Access to a network of top-tier industry mentors."
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        text: "AI-driven insights to give you a competitive edge."
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-green-500" />,
        text: "Community-driven resources and real interview experiences."
    }
]

const mentors = [
  {
    id: 1,
    name: 'Aditya Sharma',
    company: 'Amazon',
    role: 'SDE II',
    imageId: 'mentor-1',
    imageHint: 'professional portrait'
  },
  {
    id: 2,
    name: 'Priya Singh',
    company: 'Google',
    role: 'Product Manager',
    imageId: 'mentor-2',
    imageHint: 'professional woman'
  },
  {
    id: 3,
    name: 'Rohan Verma',
    company: 'Microsoft',
    role: 'Data Scientist',
    imageId: 'mentor-3',
    imageHint: 'software engineer'
  },
];


const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

const FeatureCard = ({ icon, title, description }: { icon: JSX.Element, title: string, description: string }) => (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className='p-4 bg-primary/10 rounded-full'>
            {icon}
        </div>
        <h3 className="text-xl font-bold font-headline mt-4 mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);


export default function HomePage() {
  const { user, isUserLoading } = useUser();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold font-headline text-xl">
              PlacementPro
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {!isUserLoading && user ? (
              <Button asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
                Your All-In-One Placement Preparation Platform
              </h1>
              <p className="text-lg text-muted-foreground">
                PlacementPro combines AI-powered tools, expert mentorship, and
                community resources to help you land your dream job in tech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Start Your Journey <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            {heroImage && (
              <div className="relative h-80 lg:h-[400px] w-full rounded-xl shadow-lg overflow-hidden group">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={heroImage.imageHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-muted">
            <div className='container'>
                 <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Features Built for Your Success</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        From AI analysis to human expertise, we've got you covered at every step of your interview preparation.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
                </div>
            </div>
        </section>

        <section id="why-us" className="py-16 md:py-24">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose PlacementPro?</h2>
                    <p className="text-lg text-muted-foreground">
                        Stop juggling multiple platforms. We provide everything you need to go from a student to a top-tier professional, all in one place.
                    </p>
                    <ul className='space-y-4'>
                        {whyChooseUsPoints.map((point, index) => (
                            <li key={index} className='flex items-start gap-3'>
                                {point.icon}
                                <span className='text-muted-foreground'>{point.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative h-80 lg:h-[400px] w-full rounded-xl shadow-lg overflow-hidden group">
                {PlaceHolderImages.find((img) => img.id === 'feature-mentors') && (
                     <Image
                        src={PlaceHolderImages.find((img) => img.id === 'feature-mentors')?.imageUrl || ''}
                        alt="Why Choose Us Image"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="team meeting"
                    />
                )}
                </div>
            </div>
        </section>

         <section id="mentors" className="py-16 md:py-24 bg-muted">
            <div className='container'>
                 <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet Our World-Class Mentors</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                       Learn from the best. Our mentors are experienced professionals from leading tech companies.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                    >
                    <CarouselContent>
                        {mentors.map((mentor) => {
                            const mentorImage = PlaceHolderImages.find(img => img.id === mentor.imageId);
                            return (
                                <CarouselItem key={mentor.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                    <Card className='overflow-hidden text-center'>
                                        <CardContent className="flex flex-col items-center aspect-square justify-center p-6">
                                            {mentorImage && (
                                                <Image
                                                    src={mentorImage.imageUrl}
                                                    alt={mentor.name}
                                                    width={120}
                                                    height={120}
                                                    className="rounded-full border-4 border-primary/50 mb-4"
                                                    data-ai-hint={mentorImage.imageHint}
                                                />
                                            )}
                                            <h3 className='text-xl font-bold font-headline'>{mentor.name}</h3>
                                            <p className='text-muted-foreground'>{mentor.role}</p>
                                            <p className='text-sm font-semibold text-primary'>{mentor.company}</p>
                                        </CardContent>
                                    </Card>
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                 <div className='text-center mt-12'>
                    <Button asChild size="lg">
                        <Link href="/dashboard/find-mentor">
                            Explore All Mentors <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} PlacementPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

