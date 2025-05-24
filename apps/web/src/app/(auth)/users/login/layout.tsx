import { Metadata } from 'next';
import React from 'react';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';

interface UserLoginLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign In — Workase',
  description:
    'Sign in to your Workase account to apply for jobs, build CVs, and discover assessments.',
  openGraph: {
    title: 'Sign In — Workase',
    description:
      'Sign in to your Workase account to apply for jobs, build CVs, and discover assessments.',
    url: CLIENT_BASE_URL,
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

export default function UserLoginLayout({ children }: UserLoginLayoutProps) {
  return children;
}
