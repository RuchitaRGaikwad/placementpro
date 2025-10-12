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
  const userRef = firestore.collection('users').doc(currentUserUid);

  try {
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // If the document doesn't exist, create it with all necessary fields.
      const dataToSet: { displayName: string; photoURL?: string; resumeURL?: string; email: string; role: string, id: string } = {
        id: currentUserUid,
        displayName,
        email: decodedToken.email || '',
        role: 'student' // Assign a default role
      };
      if (photoURL) dataToSet.photoURL = photoURL;
      if (resumeURL) dataToSet.resumeURL = resumeURL;
      
      await userRef.set(dataToSet);
      revalidatePath('/dashboard/settings');
      revalidatePath('/dashboard');
      return { success: true, message: 'Profile created and saved successfully.' };

    } else {
        // If it exists, update it.
        const dataToUpdate: { displayName: string, photoURL?: string, resumeURL?: string } = {
            displayName
        };
        // Only include optional fields if they are provided, to avoid overwriting with empty strings
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
    }

  } catch (error) {
    console.error('Error updating settings:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
