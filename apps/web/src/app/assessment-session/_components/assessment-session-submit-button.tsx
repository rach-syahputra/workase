'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CalculateAssessmentResult } from '@/lib/apis/user-assessment';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Button } from '@/components/shadcn-ui/button';

const AssessmentSessionSubmitButton = () => {
  const router = useRouter();
  const { getAssessmentSessionFromLocalStorage, userAssessment } =
    useAssessmentSessionContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitAssessment = async () => {
    setIsLoading(true);

    const assessmentSessionFromLocalStorage =
      getAssessmentSessionFromLocalStorage();

    const assessmentAnswers = assessmentSessionFromLocalStorage?.questions.map(
      (question) => ({
        assessmentQuestionId: question.id,
        selectedOptionId: question.selectedOptionId,
      }),
    );

    const response = await CalculateAssessmentResult({
      userAssessmentId: userAssessment?.userAssessmentId || '',
      assessmentAnswers: assessmentAnswers || [],
    });

    if (response.data?.userAssessment) {
      router.push('/dashboard/assessments');
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={submitAssessment} variant="dark" disabled={isLoading}>
      Submit
    </Button>
  );
};

export default AssessmentSessionSubmitButton;
