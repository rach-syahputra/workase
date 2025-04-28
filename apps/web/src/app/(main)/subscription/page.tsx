import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SubscriptionPlanProvider } from '@/context/subscription-plan-context';
import PageContent from './_components/page-content';

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
