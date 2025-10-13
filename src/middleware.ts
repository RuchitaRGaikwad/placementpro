
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('__session');

  const isAuthPage = pathname === '/';

  if (sessionCookie && isAuthPage) {
    // If user has a session and is on the login page, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
 
  return NextResponse.next()
}
 
export const config = {
  // Match all paths except for static files and the API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
