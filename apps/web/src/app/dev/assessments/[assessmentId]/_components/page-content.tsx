'use client';

import { useEffect, useState } from 'react';

import { getAssessmentBySlug } from '@/lib/apis/assessments';
import { IAssessmentDetail } from '@/lib/interfaces/assessment';
import { useDeveloperAssessmentContext } from '@/context/developer-assessment-context';
import DeveloperContainer from '@/components/developer/developer-container';
import DeveloperHeader from '@/components/developer/developer-header';
import DeveloperCTA from '@/components/developer/developer-cta';
import AppBreadCrumb from '@/components/ui/app-breadcrumb';
import BrowseAssessmentQuestions from './browse-assessment-questions';

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
          description={`Manage ${skillTitle?.toLowerCase()} assessment with ease.`}
          isLoading={isLoading && !skillTitle}
        />
        <DeveloperCTA
          label="Create Question"
          href={`/dev/assessments/${slug}/questions/new`}
          isLoading={!assessment}
          className="py-2 max-sm:w-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-4">
        <BrowseAssessmentQuestions slug={slug} />
      </div>
    </DeveloperContainer>
  );
};

export default PageContent;
