
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { initializeAdmin } from '@/firebase/admin';
import { auth } from 'firebase-admin';

export async function POST(request: NextRequest) {
  initializeAdmin();
  const idToken = await request.text();
  
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn });
    
    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
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
