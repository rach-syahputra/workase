import { SubscriptionActiveTabType } from '@/lib/interfaces/api-response/subscription';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import PageContent from './_components/page-content';

interface SubscriptionsPageProps {
  searchParams: { tab: SubscriptionActiveTabType };
}

const SubscriptionsPage = async ({ searchParams }: SubscriptionsPageProps) => {
  const activeTab = searchParams.tab || 'overview';

  return (
    <UserDashboardContainer>
      <PageContent activeTab={activeTab} />
    </UserDashboardContainer>
  );
};

export default SubscriptionsPage;
