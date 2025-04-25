import { TransactionTabType } from '@/lib/interfaces/transaction';
import { PendingTransactionProvider } from '@/context/pending-transaction-context';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import TransactionTab from './_components/transaction-tab';

interface TransactionsPageProps {
  searchParams: { tab: TransactionTabType };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const activeTab = searchParams.tab || 'pending';

  return (
    <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
      <PendingTransactionProvider>
        <TransactionTab activeTab={activeTab} />
      </PendingTransactionProvider>
    </UserDashboardContainer>
  );
};

export default TransactionsPage;
