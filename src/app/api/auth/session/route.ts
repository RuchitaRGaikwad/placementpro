
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { initializeAdmin } from '@/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  const { auth, firestore } = initializeAdmin();
  const idToken = await request.text();
  
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const decodedIdToken = await getAuth().verifyIdToken(idToken);
    
    // Check if user exists in Firestore
    const userRef = firestore.collection('users').doc(decodedIdToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        // Create user document if it doesn't exist
        await userRef.set({
            id: decodedIdToken.uid,
            email: decodedIdToken.email,
            displayName: decodedIdToken.name || 'New User',
            role: 'student', // Default role
            photoURL: decodedIdToken.picture || '',
        });
    }

    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}

export async function DELETE() {
  cookies().delete('__session');
  return NextResponse.json({ success: true });
}
