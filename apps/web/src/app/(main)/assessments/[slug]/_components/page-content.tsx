'use client';

import { useEffect, useState } from 'react';

import { IAssessment } from '@/lib/interfaces/assessment';
import { getAssessmentBySlug } from '@/lib/apis/assessments';
import AppLoading from '@/components/ui/app-loading';
import Assessment from './assessment';
import Certificate from './certificate';

interface PageContentProps {
  slug: string;
}

const PageContent = ({ slug }: PageContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assessment, setAssessment] = useState<IAssessment>();

  const fetchAssessment = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await getAssessmentBySlug({ isOnClient: true, slug });

    if (response.success) {
      setAssessment(response.data?.assessment);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAssessment();
  }, [slug]);

  return (
    <div className="bg-primary-gray-background flex min-h-[calc(100svh-68px)] w-full flex-col gap-8">
      {isLoading ? (
        <div className="bg-background fixed left-0 top-0 z-[100] flex min-h-screen w-screen flex-1 items-center justify-center">
          <AppLoading size="md" label="Getting assessment ready" />
        </div>
      ) : assessment ? (
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
