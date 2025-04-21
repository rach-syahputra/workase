'use client';

import { useEffect, useState } from 'react';

import { getAssessmentBySlug } from '@/lib/apis/assessments';
import { IAssessmentDetail } from '@/lib/interfaces/assessment';
import { useDeveloperAssessmentContext } from '@/context/developer-assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import AppBreadCrumb from '@/components/ui/app-breadcrumb';
import BrowseAssessmentQuestions from './browse-assessment-questions';
import CreateQuestionButton from './create-question-button';

interface PageContentProps {
  slug: string;
}

const PageContent = ({ slug }: PageContentProps) => {
  const { currentAssessmentSkill, setCurrentAssessmentSkill } =
    useDeveloperAssessmentContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assessment, setAssessment] = useState<IAssessmentDetail>();
  const skillTitle = assessment?.skill.title;

  const fetchAssessmentBySlug = async () => {
    setIsLoading(true);

    const response = await getAssessmentBySlug({ slug });

    if (response.success) {
      setAssessment(response.data?.assessment);
      setCurrentAssessmentSkill(response.data?.assessment.skill.title || '');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAssessmentBySlug();
  }, [slug]);

  const BreadCrumbItems = [
    {
      href: '/dev/assessments',
      label: 'Assessments',
    },
    {
      href: `/dev/assessments/${slug}`,
      label: currentAssessmentSkill || 'Detail',
    },
  ];

  return (
    <DeveloperContainer>
      <AppBreadCrumb items={BreadCrumbItems} />
      <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row">
        <DeveloperHeader
          title={`${skillTitle} Assessment`}
          description="Manage assessment with ease."
          isLoading={isLoading && !skillTitle}
        />
        <CreateQuestionButton
          isLoading={isLoading}
          disabled={(assessment?.totalQuestions ?? 0) >= 25}
          assessmentSlug={assessment?.slug || ''}
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-4">
        <BrowseAssessmentQuestions slug={slug} />
      </div>
    </DeveloperContainer>
  );
};

export default PageContent;
