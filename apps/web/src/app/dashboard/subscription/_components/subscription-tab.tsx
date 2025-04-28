import Link from 'next/link';

import { SubscriptionActiveTabType } from '@/lib/interfaces/api-response/subscription';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import Transaction from './transaction';
import Overview from './overview';

interface SubscriptionTabProps {
  activeTab: SubscriptionActiveTabType;
}

const SubscriptionTab = ({ activeTab }: SubscriptionTabProps) => {
  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="w-full justify-start">
        <TabsTrigger asChild value="overview" className="px-8">
          <Link href="/dashboard/subscription?tab=overview">Overview</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="billing" className="px-8">
          <Link href="/dashboard/subscription?tab=billing">
            Billing History
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Overview />
      </TabsContent>
      <TabsContent value="billing">
        <Transaction />
      </TabsContent>
    </Tabs>
  );
};

export default SubscriptionTab;
