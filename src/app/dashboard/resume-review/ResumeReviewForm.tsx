'use client';

import { useFormState, useFormStatus } from 'react-dom';
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
import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowRight, Award, Bot, Sparkles, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Bot className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" /> Analyze Now
        </>
      )}
    </Button>
  );
}

export function ResumeReviewForm() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(reviewResumeAction, {
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

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Resume (PDF)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => field.onChange(e.target.files)}
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
                <FormItem className="md:col-span-2">
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the full job description here..."
                      className="min-h-[200px] resize-y"
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
        <Card className="mt-8 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <Award className="w-7 h-7 text-primary" />
              Resume Analysis Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Match Score</p>
                <p className="text-6xl font-bold font-headline text-primary">{analysisResult.matchScore}<span className='text-3xl'>%</span></p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <Bot className="mr-2 h-5 w-5" /> AI-Powered Improvement Suggestions
                </h3>
                <div className="prose prose-sm max-w-none text-muted-foreground p-4 border rounded-md bg-background">
                  <p>{analysisResult.improvements}</p>
                </div>
              </div>
            </div>
            <Separator />
             <Card className="bg-primary/10 border-primary/20">
                <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 bg-accent rounded-full">
                        <Star className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-primary font-headline">Go a Step Further: Get a Premium Review</CardTitle>
                        <CardDescription className="text-primary/80">
                         Upgrade to a premium review for detailed, personalized feedback from an industry expert.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Request Expert Review <ArrowRight className="ml-2" />
                    </Button>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
