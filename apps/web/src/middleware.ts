import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// route yang butuh login dulu
const loginRequiredRoutes = ['/apply-job', '/profile-management'];
// route yang hanya bisa diakses user terverifikasi
const verifiedUserRoutes = ['/apply-job'];
// route halam login dan register
const publicAuthPage = [
  '/users/login',
  '/users/register',
  '/companies/login',
  '/companies/register',
];
export async function middleware(req: NextRequest) {
  // ambil token dari cookie
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // ambil path URL yang sedang aktif
  const { pathname } = req.nextUrl;
  // cek apakah user sudah login
  if (publicAuthPage.some((route) => pathname.startsWith(route)) && token) {
    // jika ada parameter redirect, kembali ke halaman tersebut
    const redirectTo = req.nextUrl.searchParams.get('redirect'); // ambil parameter redirect
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
    // jika tidak ada redirect ke homepage
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  //   jika akses fitur yang butuh login tapi belum login
  if (
    loginRequiredRoutes.some((route) => pathname.startsWith(route)) &&
    !token
  ) {
    let loginUrl: URL;

    if (pathname.startsWith('/companies')) {
      loginUrl = new URL('/companies/login', req.url);
    } else {
      loginUrl = new URL('/users/login', req.url);
    }

    loginUrl.searchParams.set(
      'message',
      'Please login first before accessing this page',
    );

    return NextResponse.redirect(loginUrl);
  }

  //   jika akses fitur yang butuh verifikasi tapi belum verifikasi
  if (
    verifiedUserRoutes.some((route) => pathname.startsWith(route)) &&
    token &&
    token.isVerified === false
  ) {
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
    '/apply-job/:path*',
    '/users/login',
    '/users/register',
    '/companies/login',
    '/companies/register',
    '/apply-job',
  ],
};
