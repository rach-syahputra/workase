import Link from 'next/link';

import { TransactionTabType } from '@/lib/interfaces/transaction';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import PendingTransactions from './pending-transaction';
import CompletedTransaction from './completed-transaction';

interface TransactionTabProps {
  activeTab: TransactionTabType;
}

const TransactionTab = ({ activeTab }: TransactionTabProps) => {
  return (
    <Tabs defaultValue={activeTab} className="flex-1">
      <TabsList className="w-full justify-start">
        <TabsTrigger asChild value="pending" className="w-full px-8 md:w-fit">
          <Link href="/dashboard/transactions?tab=pending">Pending</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="completed" className="w-full px-8 md:w-fit">
          <Link href="/dashboard/transactions?tab=completed">Completed</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending" className="">
        <PendingTransactions />
      </TabsContent>
      <TabsContent value="completed" className="">
        <CompletedTransaction />
      </TabsContent>
    </Tabs>
  );
};

export default TransactionTab;
