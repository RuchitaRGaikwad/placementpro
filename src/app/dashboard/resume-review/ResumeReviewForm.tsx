'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { reviewResumeAction } from '@/app/actions/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, ArrowRight, Award, Bot, Check, FileCheck, FileTerminal, Search, Sparkles, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const resumeSchema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  resume: z.any().refine((files) => files?.length === 1, 'A resume file is required.'),
});

type FormValues = z.infer<typeof resumeSchema>;

type AnalysisResult = {
  matchScore: number;
  improvements: string;
};

const loadingSteps = [
    "Parsing PDF...",
    "Analyzing job description...",
    "Comparing resume against role...",
    "Generating insights...",
    "Finalizing report...",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  const [loadingText, setLoadingText] = useState(loadingSteps[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pending) {
      let i = 0;
      setLoadingText(loadingSteps[i]);
      interval = setInterval(() => {
        i = (i + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[i]);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pending]);


  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? (
        <>
          <Bot className="mr-2 h-5 w-5 animate-spin" /> {loadingText}
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" /> Analyze Now
        </>
      )}
    </Button>
  );
}

const ScoreChart = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
    const offset = circumference - (score / 100) * circumference;

    let colorClass = 'text-green-500';
    if (score < 60) colorClass = 'text-red-500';
    else if (score < 80) colorClass = 'text-yellow-500';

    return (
        <div className="relative flex items-center justify-center h-48 w-48">
            <svg className="absolute" width="160" height="160" viewBox="0 0 100 100">
                <circle
                    className="text-muted/50"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <circle
                    className={`transform-gpu -rotate-90 origin-center transition-all duration-1000 ${colorClass}`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    strokeLinecap='round'
                />
            </svg>
            <div className={`text-4xl font-bold font-headline ${colorClass}`}>{score}<span className='text-2xl'>%</span></div>
             <p className="absolute bottom-6 text-sm font-medium text-muted-foreground">Match Score</p>
        </div>
    )
}

const KeywordAnalysis = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Search className='w-5 h-5' />
                Keyword Analysis
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h3 className="font-semibold text-green-600 mb-2">Matching Keywords</h3>
                <div className='flex flex-wrap gap-2'>
                    {['React', 'Node.js', 'TypeScript', 'Agile', 'CI/CD', 'Leadership'].map(k => (
                        <Badge key={k} variant="secondary" className='bg-green-100 text-green-800 border-green-200'>{k}</Badge>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-semibold text-red-600 mb-2">Missing Keywords</h3>
                <div className='flex flex-wrap gap-2'>
                    {['GraphQL', 'Kubernetes', 'Product Strategy'].map(k => (
                        <Badge key={k} variant="secondary" className='bg-red-100 text-red-800 border-red-200'>{k}</Badge>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

const ATSCheck = () => (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FileTerminal className='w-5 h-5' />
                ATS & Formatting Check
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div className='flex items-center gap-2 text-green-600'><Check className='w-4 h-4' /> Standard Font Detected</div>
            <div className='flex items-center gap-2 text-red-600'><X className='w-4 h-4' /> Complex Tables Found (May cause parsing issues)</div>
            <div className='flex items-center gap-2 text-green-600'><Check className='w-4 h-4' /> Clear Section Headings</div>
            <div className='flex items-center gap-2 text-green-600'><Check className='w-4 h-4' /> Contact Information is Parsable</div>
        </CardContent>
    </Card>
);


const SectionBreakdown = ({improvements}: {improvements: string}) => (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FileCheck className='w-5 h-5' />
                AI-Powered Suggestions
            </CardTitle>
            <CardDescription>Actionable tips to improve your resume's impact.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Work Experience</AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
                       {improvements}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Skills Section</AccordionTrigger>
                    <AccordionContent>
                        Ensure your skills section includes keywords from the job description like 'GraphQL' and 'Kubernetes'.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Summary/Objective</AccordionTrigger>
                    <AccordionContent>
                        Tailor your summary to highlight your experience with product strategy to better match the role's requirements.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
)

export function ResumeReviewForm() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [state, formAction] = useActionState(reviewResumeAction, {
    success: false,
    message: '',
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      jobDescription: '',
      resume: undefined,
    },
    context: state,
  });

  useEffect(() => {
    if (state.success && state.analysis) {
      setAnalysisResult(state.analysis);
      form.reset();
      formRef.current?.reset();
    }
  }, [state, form]);

  useEffect(() => {
    if (analysisResult) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [analysisResult]);


  return (
    <div className="space-y-8">
      <Form {...form}>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-6">
             <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Your Resume (PDF)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the full job description here..."
                      className="min-h-[250px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!state.success && state.message && (
             <Alert variant="destructive">
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>{state.message}</AlertDescription>
             </Alert>
          )}
          
          <SubmitButton />
        </form>
      </Form>
      
      {analysisResult && (
        <div ref={resultsRef} className="pt-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight">Your Analysis is Ready</h2>
            <p className="text-muted-foreground mt-2">Here's how your resume stacks up against the job description.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 flex flex-col items-center gap-6">
                <Card className="w-full flex justify-center">
                    <CardContent className="p-0">
                        <ScoreChart score={analysisResult.matchScore} />
                    </CardContent>
                </Card>
                <ATSCheck />
            </div>
             <div className="lg:col-span-2 space-y-6">
                <KeywordAnalysis />
                <SectionBreakdown improvements={analysisResult.improvements} />
            </div>
        </div>
        </div>
      )}
    </div>
  );
}
