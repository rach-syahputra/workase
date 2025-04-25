import { DeveloperTransactionProvider } from '@/context/developer-transaction-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import BrowseTransactions from './_components/browse-transactions';

const DeveloperTransactionsPage = () => {
  return (
    <DeveloperContainer>
      <DeveloperHeader
        title="Transaction"
        description="Manage transactions with ease."
      />
      <DeveloperTransactionProvider>
        <BrowseTransactions />
      </DeveloperTransactionProvider>
    </DeveloperContainer>
  );
};

export default DeveloperTransactionsPage;
