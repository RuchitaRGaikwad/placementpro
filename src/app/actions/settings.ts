'use server';

import { z } from 'zod';
import { initializeAdmin } from '@/firebase/admin';
import { revalidatePath } from 'next/cache';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { getFirestore } from 'firebase-admin/firestore';

const settingsSchema = z.object({
  displayName: z.string().min(2, { message: 'Display name must be at least 2 characters.' }),
  photoURL: z.string().url({ message: 'Please enter a valid URL for your photo.' }).optional().or(z.literal('')),
  resumeURL: z.string().url({ message: 'Please enter a valid URL for your resume.' }).optional().or(z.literal('')),
});

type FormState = {
  success: boolean;
  message: string;
};

export async function updateSettingsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { firestore } = initializeAdmin();
  
  const sessionCookie = cookies().get('__session')?.value;
  if (!sessionCookie) {
    return { success: false, message: 'You must be logged in to update settings.' };
  }

  let decodedToken;
  try {
    decodedToken = await getAuth().verifySessionCookie(sessionCookie, true);
  } catch (error) {
    return { success: false, message: 'Your session is invalid. Please log in again.' };
  }
  
  const currentUserUid = decodedToken.uid;


  const validatedFields = settingsSchema.safeParse({
    displayName: formData.get('displayName'),
    photoURL: formData.get('photoURL'),
    resumeURL: formData.get('resumeURL'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] || 'Invalid input.';
    return {
      success: false,
      message: firstError,
    };
  }

  const { displayName, photoURL, resumeURL } = validatedFields.data;

  try {
    const userRef = getFirestore().collection('users').doc(currentUserUid);

    const dataToUpdate: { displayName: string, photoURL?: string, resumeURL?: string } = {
        displayName
    };

    if (photoURL) {
        dataToUpdate.photoURL = photoURL;
    }

    if (resumeURL) {
        dataToUpdate.resumeURL = resumeURL;
    }

    await userRef.update(dataToUpdate);

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard'); // To update avatar in layout

    return { success: true, message: 'Settings updated successfully.' };
  } catch (error) {
    console.error('Error updating settings:', error);
    if ((error as any).code === 'permission-denied' || (error as any).code === 5) { // permission-denied or NOT_FOUND
        // Create the document if it doesn't exist.
        const userRef = getFirestore().collection('users').doc(currentUserUid);
        const dataToSet: { displayName: string, photoURL?: string, resumeURL?: string, email: string, role: string } = {
            displayName,
            email: decodedToken.email || '',
            role: 'student'
        };
        if (photoURL) dataToSet.photoURL = photoURL;
        if (resumeURL) dataToSet.resumeURL = resumeURL;
        
        await userRef.set(dataToSet, { merge: true });
        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard');
        return { success: true, message: 'Settings created and saved successfully.' };
    }
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
