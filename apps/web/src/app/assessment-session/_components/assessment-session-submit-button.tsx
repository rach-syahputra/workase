'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { calculateAssessmentResult } from '@/lib/apis/user-assessment';
import { ASSESSMENT_SESSION_KEY } from '@/lib/constants/assessment';
import { removeFromLocalStorage } from '@/hooks/use-local-storage';
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

    const response = await calculateAssessmentResult({
      userAssessmentId: userAssessment?.userAssessmentId || '',
      assessmentAnswers: assessmentAnswers || [],
    });

    if (response.success) {
      removeFromLocalStorage(ASSESSMENT_SESSION_KEY);
      router.push('/dashboard/assessments?tab=history');
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={submitAssessment}
      variant="dark"
      disabled={isLoading}
      className="w-full"
    >
      Submit
    </Button>
  );
};

export default AssessmentSessionSubmitButton;
