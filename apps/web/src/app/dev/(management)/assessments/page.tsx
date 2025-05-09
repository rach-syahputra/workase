import { CreateAssessmentProvider } from '@/context/create-assessment-context';
import { BrowseSkillsProvider } from '@/context/browse-skills-context';
import { AssessmentProvider } from '@/context/assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import BrowseAssessments from './_components/browse-assessments';
import BrowseSkills from './_components/browse-skills/browse-skills';
import CreateAssessment from './_components/create-assessments/create-assessment';

export default function AssessmentsPage() {
  return (
    <DeveloperContainer>
      <DeveloperHeader
        title="Assessment"
        description="Manage assessments with ease."
      />
      <BrowseSkillsProvider>
        <CreateAssessmentProvider>
          <AssessmentProvider>
            <div className="flex w-full flex-col gap-16 md:gap-8 lg:grid lg:grid-cols-2 lg:gap-4">
              <BrowseSkills />
              <CreateAssessment />
            </div>
            <div className="mt-16 flex flex-col items-start justify-center gap-4 md:mt-0">
              <BrowseAssessments />
            </div>
          </AssessmentProvider>
        </CreateAssessmentProvider>
      </BrowseSkillsProvider>
    </DeveloperContainer>
  );
}
