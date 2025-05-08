import { UserAssessmentActiveTab } from '@/lib/interfaces/user-assessment';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import AssessmentTab from './_components/assessment-tab';

interface AssessmentsPageProps {
  searchParams: { tab: UserAssessmentActiveTab };
}

const AssessmentsPage = async ({ searchParams }: AssessmentsPageProps) => {
  const activeTab = searchParams.tab || 'discovery';

  return (
    <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
      <AssessmentTab activeTab={activeTab} />
    </UserDashboardContainer>
  );
};

export default AssessmentsPage;
