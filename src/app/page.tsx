
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Users,
  Zap,
  LayoutDashboard,
  CalendarCheck,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons/logo';
import { useUser } from '@/firebase';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
const featureResume = PlaceHolderImages.find(
  (img) => img.id === 'feature-resume-review'
);
const featureMentors = PlaceHolderImages.find(
  (img) => img.id === 'feature-mentors'
);
const featureResources = PlaceHolderImages.find(
  (img) => img.id === 'feature-resources'
);
const featureBootcamps = PlaceHolderImages.find(
  (img) => img.id === 'feature-bootcamps'
);

const mentors = [
  { name: 'Aditya Sharma', role: 'SDE II, Amazon', imageId: 'mentor-1' },
  { name: 'Priya Singh', role: 'Product Manager, Google', imageId: 'mentor-2' },
  { name: 'Rohan Verma', role: 'Data Scientist, Microsoft', imageId: 'mentor-3' },
];

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'AI Resume Review',
    description:
      'Get an instant match score and improvement tips for your resume against any job description.',
    image: featureResume,
    link: '/dashboard/resume-review',
    isPremium: false,
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '1-on-1 Mentorship',
    description:
      'Book mock interviews with verified mentors from top tech companies and get personalized feedback.',
    image: featureMentors,
    link: '/dashboard/find-mentor',
    isPremium: true,
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Resource Library',
    description:
      'Access a community-driven library of interview experiences, questions, and learning materials.',
    image: featureResources,
    link: '/dashboard/resources',
    isPremium: false,
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Exclusive Bootcamps',
    description:
      'Enroll in expert-led bootcamps on topics like System Design, DSA, and more to fast-track your learning.',
    image: featureBootcamps,
    link: '/dashboard/bootcamps',
    isPremium: true,
  },
];

const quickLinks = [
    { title: 'Review Your Resume', href: '/dashboard/resume-review', icon: FileText },
    { title: 'Find a Mentor', href: '/dashboard/find-mentor', icon: Activity },
    { title: 'View Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
    { title: 'Explore Resources', href: '/dashboard/resources', icon: BookOpen },
];


export default function HomePage() {
  const { user, isUserLoading } = useUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold font-headline text-xl">PlacementPro</span>
          </Link>
          <nav className="hidden flex-1 items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="#features"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Features
            </Link>
            <Link
              href="#mentors"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Mentors
            </Link>
             <Link
              href="/dashboard"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
            {!isUserLoading && !user && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">
                    Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
             {!isUserLoading && user && (
                <Button asChild>
                  <Link href="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
             )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div className="flex flex-col items-start gap-6">
              <Badge variant="outline" className="py-1 px-3">
                <Zap className="mr-2 h-4 w-4 text-accent" />
                Free &amp; Premium Placement Prep
              </Badge>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Your Gateway to Top Tech Careers in India
              </h1>
              <p className="text-lg text-muted-foreground">
                PlacementPro democratizes job placement preparation with a free,
                community-driven knowledge base and premium mentorship from
                industry experts.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Get Started Free <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={800}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
             <div className="container">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline flex items-center gap-2">
                           <LayoutDashboard /> Dashboard
                        </CardTitle>
                        <CardDescription>
                            Jump right back into your prep.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickLinks.map(link => (
                            <Button key={link.title} variant="outline" className="h-24 flex-col justify-center gap-2" asChild>
                                <Link href={link.href}>
                                    <link.icon className="h-6 w-6 text-primary" />
                                    <span className="text-sm font-medium text-center">{link.title}</span>
                                </Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>


        <section id="features" className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                An Ecosystem for Success
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to land your dream job, all in one
                platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="overflow-hidden group">
                   <Link href={feature.link} className="flex flex-col h-full">
                      {feature.image && (
                        <div className="relative">
                          <Image
                            src={feature.image.imageUrl}
                            alt={feature.image.description}
                            width={600}
                            height={400}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={feature.image.imageHint}
                          />
                          {feature.isPremium && (
                            <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground">Premium</Badge>
                          )}
                        </div>
                      )}
                      <CardHeader>
                        <div className="mb-4">{feature.icon}</div>
                        <CardTitle className="font-headline">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='flex-grow'>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                   </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="mentors" className="py-20 bg-muted/50">
          <div className="container text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Learn from the Best
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mentors are seasoned professionals from your dream companies,
              ready to guide you.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {mentors.map((mentor) => {
                const mentorImage = PlaceHolderImages.find(
                  (img) => img.id === mentor.imageId
                );
                return (
                  <Card key={mentor.name} className="text-center">
                    <CardContent className="p-6">
                      {mentorImage && (
                        <Image
                          src={mentorImage.imageUrl}
                          alt={mentor.name}
                          width={100}
                          height={100}
                          className="rounded-full mx-auto mb-4 border-4 border-muted"
                          data-ai-hint={mentorImage.imageHint}
                        />
                      )}
                      <h3 className="font-bold text-lg font-headline">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-primary">{mentor.role}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Button size="lg" className="mt-12" asChild>
              <Link href="/dashboard/find-mentor">
                Browse All Mentors <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Ready to Kickstart Your Career?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of students on the path to their dream jobs.
              Create your free account today.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8"
              asChild
            >
              <Link href="/login">
                Join PlacementPro Now
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <p className="text-sm text-muted-foreground font-headline">
              &copy; {new Date().getFullYear()} PlacementPro. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
