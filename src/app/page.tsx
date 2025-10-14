'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ArrowRight,
  Bot,
  GraduationCap,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { useUser } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

const FeatureCard = ({ icon, title, description }: { icon: JSX.Element, title: string, description: string }) => (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
        {icon}
        <h3 className="text-xl font-bold font-headline mt-4 mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);


export default function HomePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

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
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Get Started</Link>
            </Button>
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
              <div className="relative h-80 lg:h-[400px] w-full rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
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

      </main>
      <footer className="py-8 border-t">
        <div className="container text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} PlacementPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
