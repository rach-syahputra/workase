'use client';

import { useEffect, useState } from 'react';

import { getAssessmentById } from '@/lib/apis/assessments';
import { IAssessmentDetail } from '@/lib/interfaces/assessment';
import { useDeveloperAssessmentContext } from '@/context/developer-assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import DeveloperCTA from '@/components/developer/developer-cta';
import AppBreadCrumb from '@/components/ui/app-breadcrumb';
import BrowseAssessmentQuestions from './browse-assessment-questions';

interface PageContentProps {
  assessmentId: string;
}

const PageContent = ({ assessmentId }: PageContentProps) => {
  const { currentAssessmentSkill, setCurrentAssessmentSkill } =
    useDeveloperAssessmentContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assessment, setAssessment] = useState<IAssessmentDetail>();
  const skillTitle = assessment?.skill.title;

  const fetchAssessmentById = async () => {
    setIsLoading(true);

    const response = await getAssessmentById({ id: assessmentId });

    if (response.success) {
      setAssessment(response.data?.assessment);
      setCurrentAssessmentSkill(response.data?.assessment.skill.title || '');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAssessmentById();
  }, [assessmentId]);

  const BreadCrumbItems = [
    {
      href: '/dev/assessments',
      label: 'Assessments',
    },
    {
      href: `/dev/assessments/${assessmentId}`,
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
        <DeveloperCTA
          label="Create Question"
          href={`/dev/assessments/${assessmentId}/questions/new`}
          isLoading={!assessment}
          className="py-2 max-sm:w-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-4">
        <BrowseAssessmentQuestions assessmentId={assessmentId} />
      </div>
    </DeveloperContainer>
  );
};

export default PageContent;
