'use server';

import { z } from 'zod';
import { analyzeResume } from '@/ai/flows/ai-resume-review';

const resumeSchema = z.object({
  jobDescription: z.string().min(50, { message: 'Job description must be at least 50 characters long.' }),
  resume: z.instanceof(File).refine(file => file.size > 0, 'A resume file is required.'),
});

type FormState = {
  success: boolean;
  message: string;
  analysis?: {
    matchScore: number;
    improvements: string;
  };
};

export async function reviewResumeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = resumeSchema.safeParse({
    jobDescription: formData.get('jobDescription'),
    resume: formData.get('resume'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.jobDescription?.[0] || validatedFields.error.flatten().fieldErrors.resume?.[0] || "Invalid input."
    };
  }

  const { resume, jobDescription } = validatedFields.data;

  if (resume.type !== 'application/pdf') {
      return { success: false, message: 'Only PDF files are allowed for resumes.' };
  }
  
  if (resume.size > 5 * 1024 * 1024) { // 5MB limit
      return { success: false, message: 'Resume file size cannot exceed 5MB.' };
  }

  try {
    const buffer = await resume.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const resumeDataUri = `data:${resume.type};base64,${base64}`;

    const analysis = await analyzeResume({
      resumeDataUri,
      jobDescription,
    });

    return {
      success: true,
      message: 'Analysis complete.',
      analysis,
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during analysis. Please try again later.',
    };
  }
}
