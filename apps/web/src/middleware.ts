import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// route that needed for login
const loginRequiredRoutes = [
  '/dashboard',
  '/profile-management',
  '/subscription',
];
// route that can access with verified user
const verifiedUserRoutes = ['/subscription'];
// route login and register page
const publicAuthPage = [
  '/users/login',
  '/users/register',
  '/companies/login',
  '/companies/register',
];
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  // cek did user login
  if (publicAuthPage.some((route) => pathname.startsWith(route)) && token) {
    // if there is redirect parameter, back to that page
    const redirectTo = req.nextUrl.searchParams.get('redirect'); // take redirect parameter
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
    // if there is no redirect parameter, redirect to homepage
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  //   if user access feture that need login but they didn`t login yet
  if (
    loginRequiredRoutes.some((route) => pathname.startsWith(route)) &&
    !token
  ) {
    console.log('redirect guest user to login page...');

    let loginUrl: URL;

    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set(
      'message',
      'Please login first before accessing this page',
      {
        maxAge: 60,
        path: '/',
        sameSite: 'lax',
      },
    );
    return response;
  }

  //   if access feature that need verified user, but they are not verified
  if (
    verifiedUserRoutes.some((route) => pathname.startsWith(route)) &&
    token &&
    token.isVerified === false
  ) {
    console.log('redirect unverified user to homepage...');

    const homeUrl = new URL('/', req.url);
    homeUrl.searchParams.set(
      'message',
      'Please verify your email first before accessing this page',
    );
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/profile-management/:path*',
    '/subscription/:path*',
    '/dashboard/:path*',
    ...publicAuthPage,
  ],
};
