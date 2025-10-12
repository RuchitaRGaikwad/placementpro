'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateSettingsAction } from '@/app/actions/settings';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase/provider';
import { doc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2, Save, Settings } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const settingsSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters.'),
  photoURL: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  resumeURL: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof settingsSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-5 w-5" /> Save Changes
        </>
      )}
    </Button>
  );
}

export default function SettingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<any>(userProfileRef);

  const [state, formAction] = useActionState(updateSettingsAction, {
    success: false,
    message: '',
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: '',
      photoURL: '',
      resumeURL: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        displayName: userProfile.displayName || '',
        photoURL: userProfile.photoURL || '',
        resumeURL: userProfile.resumeURL || '',
      });
    } else if(user) {
         form.reset({
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            resumeURL:  '',
         })
    }
  }, [userProfile, user, form]);

  const renderForm = () => {
    if (isProfileLoading) {
      return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-11 w-36" />
        </div>
      );
    }

    return (
       <Form {...form}>
        <form action={formAction} className="space-y-6">
            <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                    <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="photoURL"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Profile Picture URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://example.com/your-photo.jpg" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="resumeURL"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Resume URL (Publicly accessible)</FormLabel>
                <FormControl>
                    <Input placeholder="https://example.com/your-resume.pdf" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {state.message && (
                <Alert variant={state.success ? 'default' : 'destructive'} className={state.success ? 'bg-green-50 border-green-200 text-green-800' : ''}>
                    {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{state.success ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

          <SubmitButton />
        </form>
      </Form>
    );
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Settings className="w-8 h-8" /> Account Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile and account details.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your public profile details.</CardDescription>
        </CardHeader>
        <CardContent>
            {renderForm()}
        </CardContent>
       </Card>
    </div>
  );
}
