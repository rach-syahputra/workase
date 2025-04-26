'use client';

import { createContext, useContext, useState } from 'react';

import { IAssessmentDetail } from '@/lib/interfaces/assessment';
import { getAssessmentBySlug } from '@/lib/apis/assessments';
import { useDeveloperAssessmentContext } from '../developer-assessment-context';
import { IAssessmentQuestionContext } from './interface';

const AssessmentQuestionContext = createContext<
  IAssessmentQuestionContext | undefined
>(undefined);

const AssessmentQuestionProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const { setCurrentAssessmentSkill } = useDeveloperAssessmentContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assessment, setAssessment] = useState<IAssessmentDetail | undefined>();

  const fetchAssessmentBySlug = async () => {
    setIsLoading(true);

    const response = await getAssessmentBySlug({ slug });

    if (response.success) {
      setAssessment(response.data?.assessment);
      setCurrentAssessmentSkill(response.data?.assessment.skill.title || '');
    }

    setIsLoading(false);
  };

  return (
    <AssessmentQuestionContext.Provider
      value={{
        isLoading,
        setIsLoading,
        assessment,
        setAssessment,
        fetchAssessmentBySlug,
      }}
    >
      {children}
    </AssessmentQuestionContext.Provider>
  );
};

const useAssessmentQuestionContext = (): IAssessmentQuestionContext => {
  const context = useContext(AssessmentQuestionContext);
  if (context === undefined) {
    throw new Error(
      'useAssessmentQuestionContext must be used within a AssessmentQuestionProvider',
    );
  }
  return context;
};

export { AssessmentQuestionProvider, useAssessmentQuestionContext };
