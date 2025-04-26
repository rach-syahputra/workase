import { PendingTransactionProvider } from '@/context/pending-transaction-context';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import PageContent from './_components/page-content';

const SubscriptionsPage = () => {
  return (
    <PendingTransactionProvider>
      <UserDashboardContainer>
        <PageContent />
      </UserDashboardContainer>
    </PendingTransactionProvider>
  );
};

export default SubscriptionsPage;
