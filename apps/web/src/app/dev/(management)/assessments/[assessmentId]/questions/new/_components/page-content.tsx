'use client';

import { useDeveloperAssessmentContext } from '@/context/developer-assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import AppBreadCrumb from '@/components/ui/app-breadcrumb';
import CreateQuestionForm from './create-question-form';

interface PageContentProps {
  assessmentId: string;
}

const PageContent = ({ assessmentId }: PageContentProps) => {
  const { currentAssessmentSkill } = useDeveloperAssessmentContext();

  const BreadCrumbItems = [
    {
      href: '/dev/assessments',
      label: 'Assessments',
    },
    {
      href: `/dev/assessments/${assessmentId}`,
      label: currentAssessmentSkill || 'Detail',
    },
    {
      href: `/dev/assessments/${assessmentId}`,
      label: 'Questions',
    },
    {
      href: `/dev/assessments/${assessmentId}/questions/new`,
      label: 'New',
    },
  ];

  return (
    <DeveloperContainer className="mx-0 md:max-w-screen-md">
      <AppBreadCrumb items={BreadCrumbItems} />
      <DeveloperHeader
        title="Create New Question"
        description={`Fill in the details below to create a question related to ${currentAssessmentSkill}.`}
      />
      <CreateQuestionForm assessmentId={assessmentId} />
    </DeveloperContainer>
  );
};

export default PageContent;
