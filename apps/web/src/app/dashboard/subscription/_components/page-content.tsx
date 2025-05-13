'use client';

import { useEffect } from 'react';

import { SubscriptionActiveTabType } from '@/lib/interfaces/api-response/subscription';
import { useUserStatsContext } from '@/context/user-stats-context';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import CurrentPlan from './current-plan';
import SubscriptionTab from './subscription-tab';

interface PageContentProps {
  activeTab: SubscriptionActiveTabType;
}

const PageContent = ({ activeTab }: PageContentProps) => {
  const { setUpdate } = useUserStatsContext();

  useEffect(() => {
    setUpdate(true);
  }, [activeTab, setUpdate]);

  return (
    <div className="flex w-full flex-col gap-4">
      <UserDashboardHeader
        title="Subscription"
        description="Manage your plans, view billing history, and update your subscription details."
      />

      <CurrentPlan />

      <SubscriptionTab activeTab={activeTab} />
    </div>
  );
};

export default PageContent;
