import { UserAssessmentActiveTab } from '@/lib/interfaces/user-assessment';
import { AssessmentProvider } from '@/context/assessment-context';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import AssessmentTab from './_components/assessment-tab';

interface UserAssessmentPageProps {
  searchParams: { tab: UserAssessmentActiveTab };
}

const UserAssessmentPage = async ({
  searchParams,
}: UserAssessmentPageProps) => {
  const activeTab = searchParams.tab || 'discovery';

  return (
    <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
      <AssessmentProvider>
        <AssessmentTab activeTab={activeTab} />
      </AssessmentProvider>
    </UserDashboardContainer>
  );
};

export default UserAssessmentPage;
