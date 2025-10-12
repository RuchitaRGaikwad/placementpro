import {
  BookOpen,
  Building2,
  FileQuestion,
  Lightbulb,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const resources = [
  {
    id: 1,
    type: 'experience',
    author: 'Ananya Gupta',
    company: 'Google',
    role: 'Software Engineer Intern',
    content:
      "My Google interview experience was heavily focused on data structures and algorithms. The first two rounds were typical DSA questions on platforms like CoderPad. The final round was a mix of behavioral and system design. My advice: be strong in your fundamentals and be able to explain your thought process clearly.",
    status: 'approved',
    authorImageId: 'mentor-2',
  },
  {
    id: 2,
    type: 'question',
    author: 'Rohan Verma',
    company: 'Amazon',
    role: 'SDE 1',
    content:
      "A frequently asked question at Amazon for SDE-1 is 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.' Be prepared to write clean, production-level code and discuss its time and space complexity.",
    status: 'approved',
    authorImageId: 'mentor-3',
  },
  {
    id: 3,
    type: 'experience',
    author: 'Sameer Khan',
    company: 'Microsoft',
    role: 'Product Manager',
    content:
      "For PM roles at Microsoft, the 'design a product' questions are key. I was asked to design a smart-home device for the elderly. It's crucial to define the user persona, identify pain points, and then walk through the features, prioritization, and success metrics. The STAR method is your best friend for behavioral questions.",
    status: 'approved',
    authorImageId: 'mentor-1',
  },
];

const getAuthorImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

const ResourceIcon = ({ type }: { type: string }) => {
  if (type === 'experience') {
    return <Lightbulb className="h-6 w-6 text-primary" />;
  }
  return <FileQuestion className="h-6 w-6 text-primary" />;
};

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <BookOpen className="w-8 h-8" /> Resource Library
          </h1>
          <p className="text-muted-foreground mt-2">
            Access a community-driven library of interview experiences,
            questions, and guides.
          </p>
        </div>
        <Button>Add a Resource</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const authorImage = getAuthorImage(resource.authorImageId);
          return (
            <Card key={resource.id} className="h-full hover:border-primary transition-colors flex flex-col">
              <Link href={`/dashboard/resources/${resource.id}`} className='flex flex-col flex-grow'>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="capitalize text-lg">
                        {resource.type.replace('-', ' ')}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {resource.company} - {resource.role}
                      </CardDescription>
                    </div>
                    <ResourceIcon type={resource.type} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {resource.content}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    {authorImage && (
                      <Image
                        src={authorImage.imageUrl}
                        alt={resource.author}
                        width={32}
                        height={32}
                        className="rounded-full"
                        data-ai-hint={authorImage.imageHint}
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold">{resource.author}</p>
                      <p className="text-xs text-muted-foreground">
                        Shared this resource
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
