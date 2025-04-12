import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import Assessments from './_components/assessments';
import { AssessmentProvider } from '@/context/assessment-context';

const UserAssessmentPage = () => {
  return (
    <UserDashboardContainer>
      <UserDashboardHeader
        title="Discover Assessments"
        description="Explore a variety of skill-based assessments and boost your chances of getting hired."
      />
      <AssessmentProvider>
        <Assessments />
      </AssessmentProvider>
    </UserDashboardContainer>
  );
};

export default UserAssessmentPage;
