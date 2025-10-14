
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ResumeReviewForm } from './ResumeReviewForm';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot } from 'lucide-react';

const heroImage = PlaceHolderImages.find(
  (img) => img.id === 'resume-analysis-hero'
);

export default function ResumeReviewPage() {
  return (
    <div className="space-y-8">
       <div className="relative isolate overflow-hidden rounded-xl border">
        <div className="absolute inset-0 -z-10 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white_30%,transparent_100%)]"></div>
        <div className="p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              Score Your Resume Against Your Dream Job
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Our AI-powered tool analyzes your resume against any job description, providing a match score and actionable insights to help you beat the Applicant Tracking System (ATS).
            </p>
          </div>
        </div>
      </div>


      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <Bot className="w-6 h-6 text-primary" />
            Analyze Your Resume
          </CardTitle>
          <CardDescription>
            For the best results, upload your resume as a PDF (max 5MB) and paste the complete job description from the company's career page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
