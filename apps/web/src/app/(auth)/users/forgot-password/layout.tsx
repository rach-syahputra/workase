import { Metadata } from 'next';
import React from 'react';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';

interface UserForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Forgot Password — Workase',
  description:
    'Reset your Workase account password easily and securely. Enter your email to receive password recovery instructions.',
  openGraph: {
    title: 'Forgot Password — Workase',
    description:
      'Reset your Workase account password easily and securely. Enter your email to receive password recovery instructions.',
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

export default function UserForgotPasswordLayout({
  children,
}: UserForgotPasswordLayoutProps) {
  return children;
}
