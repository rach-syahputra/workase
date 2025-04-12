'use client';

import { IAssessmentDetail } from '@/lib/interfaces/assessment';
import Assessment from './assessment';
import { useEffect, useState } from 'react';
import AppLoading from '@/components/ui/app-loading';
import { getAssessmentBySlug } from '@/lib/apis/assessments';
import { resolve } from 'path';
import Certificate from './certificate';

interface PageContentProps {
  slug: string;
}

const PageContent = ({ slug }: PageContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assessment, setAssessment] = useState<IAssessmentDetail>();

  const fetchAssessment = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await getAssessmentBySlug({ slug });

    if (response.success) {
      setAssessment(response.data?.assessment);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAssessment();
  }, [slug]);

  return isLoading ? (
    <div className="bg-background fixed left-0 top-0 z-[100] flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Getting assessment ready" />
    </div>
  ) : (
    <div className="bg-primary-gray-background flex w-full flex-col gap-8">
      {assessment ? (
        <>
          <Assessment assessment={assessment} />
          <Certificate />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          Something went wrong with the assessment.
        </div>
      )}
    </div>
  );
};

export default PageContent;
