
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { Logo } from './icons/logo';

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  useEffect(() => {
    // When registration is successful (user object populated) and we were submitting,
    // close the dialog and redirect.
    if (!isUserLoading && user && isSubmitting) {
      onOpenChange(false);
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router, isSubmitting, onOpenChange]);

  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      // The `useEffect` hook above will handle closing the dialog and redirecting
      // once the `useUser` hook provides the new user object.
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setAuthError('This email is already registered. Please log in.');
      } else {
        setAuthError('An unexpected error occurred during registration.');
      }
      setIsSubmitting(false); // Only set to false on error to allow re-submission
    }
  }

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      registerForm.reset();
      setAuthError(null);
      setIsSubmitting(false);
    }
  }, [open, registerForm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2">
                  <Logo className="h-8 w-8" />
                  <span className="font-bold font-headline text-xl">PlacementPro</span>
              </div>
          </div>
          <DialogTitle className="text-center text-2xl">Create your account</DialogTitle>
          <DialogDescription className="text-center">
            Join PlacementPro to start your career journey.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create Account'}
                    </Button>
                </form>
            </Form>
        </div>
         {authError && <p className="text-center text-sm text-red-500">{authError}</p>}
      </DialogContent>
    </Dialog>
  );
}
