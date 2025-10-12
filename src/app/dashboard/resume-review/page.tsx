import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeReviewForm } from "./ResumeReviewForm";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FileText } from "lucide-react";

const heroImage = PlaceHolderImages.find((img) => img.id === 'resume-analysis-hero');

export default function ResumeReviewPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><FileText className="w-8 h-8"/> AI Resume Review</h1>
          <p className="text-muted-foreground mt-2">
            Get instant feedback on your resume. Upload your resume and paste a job description to see how well you match and where you can improve.
          </p>
        </div>
        {heroImage && (
            <div>
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-lg"
                    data-ai-hint={heroImage.imageHint}
                />
            </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyze Your Resume</CardTitle>
          <CardDescription>
            Upload a PDF (max 5MB) and paste the full job description below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
