import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import { SearchJobProvider } from '@/context/search-job-context';
import { UserStatsProvider } from '@/context/user-stats-context';
import { AssessmentSessionProvider } from '@/context/assessment-session-context';
import { BottomNavigationProdiver } from '@/context/bottom-navigation-context';
import { Toaster } from '@/components/shadcn-ui/toaster';

export const metadata: Metadata = {
  title: 'Workase — Exclusive Job Listing',
  description:
    'Find your dream job with Workase—a powerful job board that connects top talent with leading companies. Build professional CVs, earn certifications, browse job listings, and apply with ease to take the next step in your career.',
  openGraph: {
    title: 'Workase — Exclusive Job Listing',
    description:
      'Find your dream job with Workase—a powerful job board that connects top talent with leading companies. Build professional CVs, earn certifications, browse job listings, and apply with ease to take the next step in your career.',

    type: 'website',
    siteName: 'Workase Job Board',
    images: [
      {
        url: '/workase-sm-bg-black.png',
        secureUrl: '/workase-sm-bg-black.png',
        width: 630,
        height: 630,
        alt: 'Workase Job Board',
      },
    ],
  },
  metadataBase: new URL(CLIENT_BASE_URL),
};

const geist = localFont({
  src: [
    {
      path: '../fonts/Geist-Regular.ttf',
      weight: '400',
    },
    {
      path: '../fonts/Geist-Medium.ttf',
      weight: '500',
    },
    {
      path: '../fonts/Geist-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../fonts/Geist-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-geist',
});

const cocogooes = localFont({
  src: '../fonts/cocogoose-pro.semilight.ttf',
  display: 'swap',
  variable: '--font-cocogoose',
});

const timesNewRoman = localFont({
  src: [
    {
      path: '../fonts/times-new-roman.ttf',
      weight: '400',
    },
    {
      path: '../fonts/times-new-roman-italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Geist-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../fonts/times-new-roman-bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-times-new-roman',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${cocogooes.variable} ${timesNewRoman.variable} text-primary-dark font-[family-name:var(--font-geist)] antialiased`}
      >
        <SessionProvider>
          <UserStatsProvider>
            <SearchJobProvider>
              <AssessmentSessionProvider>
                <BottomNavigationProdiver>{children}</BottomNavigationProdiver>
              </AssessmentSessionProvider>
            </SearchJobProvider>
          </UserStatsProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
