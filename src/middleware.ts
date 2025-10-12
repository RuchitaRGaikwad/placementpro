import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('__session');

  const isAuthPage = pathname.startsWith('/login');

  if (sessionCookie) {
    if (isAuthPage) {
      // If user is logged in and tries to access login page, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    if (!isAuthPage && pathname.startsWith('/dashboard')) {
        // If user is not logged in and tries to access a protected dashboard page, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  // Match all paths except for static files and the API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
