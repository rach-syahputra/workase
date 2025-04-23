import Link from 'next/link';

import { TransactionTabType } from '@/lib/interfaces/transaction';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import PendingTransactions from './pending-transaction';

interface TransactionTabProps {
  activeTab: TransactionTabType;
}

const TransactionTab = ({ activeTab }: TransactionTabProps) => {
  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="w-full justify-start">
        <TabsTrigger asChild value="pending" className="px-8">
          <Link href="/dashboard/transactions?tab=pending">Pending</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="completed" className="px-8">
          <Link href="/dashboard/transactions?tab=completed">Completed</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <PendingTransactions />
      </TabsContent>
      <TabsContent value="completed">Completed</TabsContent>
    </Tabs>
  );
};

export default TransactionTab;
