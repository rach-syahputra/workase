import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';

export default middleware((req) => {
  if (!req.auth) {
    const homepageUrl = new URL('/', req.nextUrl.origin);

    const response = NextResponse.redirect(homepageUrl);
    response.cookies.set(
      'message',
      'Please login first before accessing this page.',
      { maxAge: 60, path: '/', sameSite: 'lax' },
    );
    return response;
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
