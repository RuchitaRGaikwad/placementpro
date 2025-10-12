
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


export default function LoginPage() {
    const auth = useAuth();
    const router = useRouter();
    const [authError, setAuthError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '', confirmPassword: '' },
    });
    
    async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
        setAuthError(null);
        setIsSubmitting(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const idToken = await userCredential.user.getIdToken();
            
            const res = await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: idToken,
            });

            if (res.ok) {
                router.push('/dashboard');
            } else {
                 setAuthError('Failed to create session. Please try again.');
            }

        } catch (error: any) {
             if (error.code === 'auth/invalid-credential') {
                setAuthError('Invalid email or password. Please try again.');
            } else {
                setAuthError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
        setAuthError(null);
        setIsSubmitting(true);
       try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const idToken = await userCredential.user.getIdToken();
            
            const res = await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: idToken,
            });

            if (res.ok) {
                router.push('/dashboard');
            } else {
                 setAuthError('Failed to create session. Please try again.');
            }
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setAuthError('This email is already registered. Please log in.');
            } else {
                setAuthError('An unexpected error occurred during registration.');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="w-full max-w-md space-y-4 px-4">
        <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8" />
                <span className="font-bold font-headline text-xl">PlacementPro</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="pt-4">
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                        control={loginForm.control}
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
                        control={loginForm.control}
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
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Login'}
                        </Button>
                    </form>
                </Form>
              </TabsContent>
              <TabsContent value="register" className="pt-4">
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
              </TabsContent>
            </Tabs>
             {authError && <p className="text-center text-sm text-red-500 mt-4">{authError}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
