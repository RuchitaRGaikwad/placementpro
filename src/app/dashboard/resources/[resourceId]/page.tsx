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
  BookCopy,
  Building2,
  FileQuestion,
  Lightbulb,
  ThumbsUp,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const resource = {
  id: 1,
  type: 'experience',
  author: 'Ananya Gupta',
  authorImageId: 'mentor-2',
  company: 'Google',
  role: 'Software Engineer Intern',
  content:
    "My Google interview experience was heavily focused on data structures and algorithms. The first two rounds were typical DSA questions on platforms like CoderPad. The final round was a mix of behavioral and system design. My advice: be strong in your fundamentals and be able to explain your thought process clearly.\n\nThe initial phone screen was with a recruiter, just to go over my resume and background. Nothing too technical.\n\nRound 1 (Technical Phone Screen): I was asked two questions. The first was a string manipulation problem, similar to a LeetCode medium. The second was about traversing a 2D matrix. I managed to solve both optimally and explained my complexity analysis.\n\nRound 2 (On-site - Virtual): This consisted of 4 interviews, each 45 minutes long.\n- Interview 1: Two more DSA questions. One was on trees (BST validation) and another on dynamic programming (coin change variant).\n- Interview 2: System design. I was asked to design a simplified version of a service like TinyURL. The focus was on API design, data model, and handling hash collisions.\n- Interview 3: Behavioral. This was the 'Googlyness' round. Questions were about teamwork, handling ambiguity, and learning from failure. I used the STAR method for all my answers.\n- Interview 4: Another DSA round, but with a twist. The problem was more open-ended and required me to first define the problem scope before diving into the algorithm. It was about finding patterns in a large stream of data.\n\nOverall, the process was rigorous but fair. Communication is key. Even if you don't get the most optimal solution immediately, talking through your approach can get you very far.",
  status: 'approved',
  tags: ['Google', 'Internship', 'DSA', 'System Design', 'Behavioral'],
};

const getAuthorImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

const ResourceIcon = ({ type }: { type: string }) => {
  if (type === 'experience') {
    return <Lightbulb className="h-8 w-8 text-primary" />;
  }
  return <FileQuestion className="h-8 w-8 text-primary" />;
};

export default function ResourceDetailPage({
  params,
}: {
  params: { resourceId: string };
}) {
  const authorImage = getAuthorImage(resource.authorImageId);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/resources">
            <ArrowLeft />
          </Link>
        </Button>
        <div className='flex-1'>
            <div className="flex items-center gap-3">
            <ResourceIcon type={resource.type} />
            <h1 className="text-3xl font-bold font-headline capitalize">
                {resource.type.replace('-', ' ')}
            </h1>
            </div>
            <p className="text-muted-foreground mt-1">
                Shared by {resource.author}
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {authorImage && (
              <Image
                src={authorImage.imageUrl}
                alt={resource.author}
                width={48}
                height={48}
                className="rounded-full"
                data-ai-hint={authorImage.imageHint}
              />
            )}
            <div className="flex-1">
              <CardTitle className="text-xl">{resource.author}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {resource.role} at {resource.company}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground dark:prose-invert">
                {resource.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
                Was this resource helpful?
            </p>
            <Button variant="outline">
                <ThumbsUp className='mr-2' />
                Helpful
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
