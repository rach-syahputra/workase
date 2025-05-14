'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { calculateAssessmentResult } from '@/lib/apis/user-assessment';
import { ASSESSMENT_SESSION_KEY } from '@/lib/constants/assessment';
import { removeFromLocalStorage } from '@/hooks/use-local-storage';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';

const AssessmentSessionSubmitButton = () => {
  const router = useRouter();
  const { getAssessmentSessionFromLocalStorage, userAssessment, progress } =
    useAssessmentSessionContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmitModal = () => {
    if (progress < 100) {
      return setOpen(true);
    }

    submitAssessment();
  };

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
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleSubmitModal}
        variant="dark"
        disabled={isLoading}
        className="w-full"
      >
        Submit
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            You haven&rsquo;t completed 100% of the assessment yet.
            There&rsquo;s still time to review or answer more questions. Are you
            sure you want to submit now?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex w-full items-center justify-center gap-2">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={submitAssessment}
            disabled={isLoading}
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentSessionSubmitButton;
