import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import CurrentPlan from './current-plan';
import Transaction from './transaction';

const PageContent = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <UserDashboardHeader
        title="Subscription"
        description="Manage your plans, view billing history, and update your subscription details."
      />

      <CurrentPlan />

      <Transaction />
    </div>
  );
};

export default PageContent;
