import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { auth } from '@/auth';
import { SubscriptionPlanProvider } from '@/context/subscription-plan-context';
import PageContent from './_components/page-content';

export const metadata: Metadata = {
  title: 'Upgrade Plan — Workase',
  description:
    'Upgrade your Workase experience with a premium subscription. Unlock exclusive features, access advanced tools, and boost your job search success.',
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
