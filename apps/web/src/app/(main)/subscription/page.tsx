import { SubscriptionPlanProvider } from '@/context/subscription-plan-context';
import PageContent from './_components/page-content';

const SubscriptionPage = () => {
  return (
    <SubscriptionPlanProvider>
      <PageContent />
    </SubscriptionPlanProvider>
  );
};

export default SubscriptionPage;
