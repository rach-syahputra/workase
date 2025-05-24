import { Metadata } from 'next';
import React from 'react';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';

interface UserRegisterLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Register — Workase',
  description:
    'Create your Workase account to apply for jobs, build professional CVs, earn certifications, and grow your career — all in one platform.',
  openGraph: {
    title: 'Register — Workase',
    description:
      'Create your Workase account to apply for jobs, build professional CVs, earn certifications, and grow your career — all in one platform.',
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

export default function UserRegisterLayout({
  children,
}: UserRegisterLayoutProps) {
  return children;
}
