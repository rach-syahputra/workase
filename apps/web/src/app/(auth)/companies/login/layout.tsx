import { Metadata } from 'next';
import React from 'react';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';

interface CompanyLoginLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Sign In — Company',
  description:
    'Sign in to your Workase company account to post job openings and manage applications.',
  openGraph: {
    title: 'Sign In — Company',
    description:
      'Sign in to your Workase company account to post job openings and manage applications.',
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

export default function CompanyLoginLayout({
  children,
}: CompanyLoginLayoutProps) {
  return children;
}
