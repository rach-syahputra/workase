'use client';

import { IAssessmentDetail } from '@/lib/interfaces/assessment';
import { useDeveloperAssessmentContext } from '@/context/developer-assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import AppBreadCrumb from '@/components/ui/app-breadcrumb';
import CreateQuestionForm from './create-question-form';

interface PageContentProps {
  assessment: IAssessmentDetail;
}

const PageContent = ({ assessment }: PageContentProps) => {
  const { currentAssessmentSkill } = useDeveloperAssessmentContext();

  const BreadCrumbItems = [
    {
      href: '/dev/assessments',
      label: 'Assessments',
    },
    {
      href: `/dev/assessments/${assessment.slug}`,
      label: currentAssessmentSkill || 'Detail',
    },
    {
      href: `/dev/assessments/${assessment.slug}`,
      label: 'Questions',
    },
    {
      href: `/dev/assessments/${assessment.slug}/questions/new`,
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
      <CreateQuestionForm
        assessment={{
          id: assessment.id,
          slug: assessment.slug,
          skill: {
            title: assessment.skill.title,
          },
        }}
      />
    </DeveloperContainer>
  );
};

export default PageContent;
