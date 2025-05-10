import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import { auth } from '@/auth';
import { SubscriptionPlanProvider } from '@/context/subscription-plan-context';
import PageContent from './_components/page-content';

export const metadata: Metadata = {
  title: 'Upgrade Plan — Workase',
  description:
    'Upgrade your Workase experience with a premium subscription. Unlock exclusive features, access advanced tools, and boost your job search success.',
  openGraph: {
    title: 'Upgrade Plan — Workase',
    description:
      'Upgrade your Workase experience with a premium subscription. Unlock exclusive features, access advanced tools, and boost your job search success.',
    url: CLIENT_BASE_URL,
    type: 'website',
    siteName: 'Workase Job Board',
    images: [
      {
        url: '/workase-sm-bg-black.png',
        secureUrl: '/workase-sm-bg-black.png',
        width: 1200,
        height: 630,
        alt: 'Workase Job Board',
      },
    ],
  },
  metadataBase: new URL(CLIENT_BASE_URL),
};

const SubscriptionPage = async () => {
  const session = await auth();
  if (!session?.user?.role) {
    redirect('/');
  }

  return (
    <SubscriptionPlanProvider>
      <PageContent />
    </SubscriptionPlanProvider>
  );
};

export default SubscriptionPage;
