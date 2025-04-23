import { TransactionTabType } from '@/lib/interfaces/transaction';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import TransactionTab from './_components/transaction-tab';

interface TransactionsPageProps {
  searchParams: { tab: TransactionTabType };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const activeTab = searchParams.tab || 'pending';

  return (
    <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
      <TransactionTab activeTab={activeTab} />
    </UserDashboardContainer>
  );
};

export default TransactionsPage;
