import { CreateAssessmentProvider } from '@/context/create-assessment-context';
import { AssessmentProvider } from '@/context/assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import BrowseAssessments from './_components/browse-assessments';
import CreateAssessment from './_components/create-assessment';

export default function AssessmentsPage() {
  return (
    <DeveloperContainer>
      <DeveloperHeader
        title="Assessment"
        description="Manage assessments with ease."
      />
      <CreateAssessmentProvider>
        <AssessmentProvider>
          <div className="flex w-full gap-4 xl:grid xl:grid-cols-2">
            <CreateAssessment />
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <BrowseAssessments />
          </div>
        </AssessmentProvider>
      </CreateAssessmentProvider>
    </DeveloperContainer>
  );
}
