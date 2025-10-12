'use client';

import { useCollection, useUser, useMemoFirebase, useFirestore } from '@/firebase/provider';
import { collection, query, orderBy } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Loader2, ServerCrash } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ResumeAnalysis {
  id: string;
  jobDescription: string;
  matchScore: number;
  improvements: string;
  analyzedAt: string;
}

export default function ResumeHistoryPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const analysesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'resumeAnalyses'),
      orderBy('analyzedAt', 'desc')
    );
  }, [user, firestore]);

  const { data: analyses, isLoading, error } = useCollection<ResumeAnalysis>(analysesQuery);

  const getScoreBadgeColor = (score: number) => {
    if (score > 85) return 'bg-green-500';
    if (score > 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderContent = () => {
    if (isUserLoading || isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not load resume analysis history. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }
    
    if (!analyses || analyses.length === 0) {
      return (
        <div className="text-center py-16">
          <History className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No History Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You haven&apos;t analyzed any resumes yet.
          </p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <Card key={analysis.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="line-clamp-1 break-all">
                    Analysis for: {analysis.jobDescription.substring(0, 50)}...
                  </span>
                  <Badge className={`text-white ${getScoreBadgeColor(analysis.matchScore)}`}>
                    {analysis.matchScore}% Match
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {format(new Date(analysis.analyzedAt), "PPP 'at' p")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{analysis.improvements}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <History className="w-8 h-8" /> Resume Analysis History
        </h1>
        <p className="text-muted-foreground mt-2">
          Review your past AI-powered resume analyses.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
