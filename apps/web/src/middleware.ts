import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';

export default middleware((req) => {
  if (!req.auth) {
    const loginUrl = new URL('/users/login', req.nextUrl.origin);
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    loginUrl.searchParams.set('redirect', callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile-management/:path*',
    '/cv/:slug/edit',
    '/subscription',
  ],
};
