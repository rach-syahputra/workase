import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';

export default middleware((req) => {
  if (!req.auth) {
    const homepageUrl = new URL('/', req.nextUrl.origin);
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    homepageUrl.searchParams.set('redirect', callbackUrl);

    return NextResponse.redirect(homepageUrl);
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
