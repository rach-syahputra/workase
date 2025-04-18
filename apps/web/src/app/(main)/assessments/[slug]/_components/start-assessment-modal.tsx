'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import {
  ASSESSMENT_INSTRUCTIONS,
  ASSESSMENT_SESSION_KEY,
} from '@/lib/constants/assessment';
import { addUserAssessment } from '@/lib/apis/user-assessment';
import {
  removeFromLocalStorage,
  setLocalStorage,
} from '@/hooks/use-local-storage';
import { IAssessmentSessionLocalStorage } from '@/context/assessment-session-context/interface';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import Icon from '@/components/ui/icon';

interface StartAssessmentModalProps {
  slug: string;
  assessmentId: string;
}

const StartAssessmentModal = ({
  slug,
  assessmentId,
}: StartAssessmentModalProps) => {
  const router = useRouter();
  const { setPage, setProgress } = useAssessmentSessionContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleStartAssessment = async () => {
    // TO DO: Retrieve userId from user session
    const response = await addUserAssessment({
      userId: 'ndy-01',
      assessment: {
        id: assessmentId,
        slug,
      },
      score: 0,
      status: 'ON_GOING',
    });

    if (response.success) {
      removeFromLocalStorage(ASSESSMENT_SESSION_KEY);
      setLocalStorage(ASSESSMENT_SESSION_KEY, {
        currentPage: 1,
        progress: 0,
        questions: [],
      } as IAssessmentSessionLocalStorage);
      setPage(1);
      setProgress(0);

      const token = response.data?.userAssessment.token;
      if (token) {
        router.push(`/assessment-session?token=${token}`);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="group h-10 text-base tracking-wide transition-all duration-300 ease-in-out sm:w-fit"
        >
          <div className="relative flex h-full w-fit items-center justify-center pr-6">
            Start Assessment
            <Icon
              icon={faArrowRight}
              className="absolute right-0 transition-all duration-300 ease-in-out group-hover:-right-0.5"
            />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Assessment Preparation</DialogTitle>
          <DialogDescription>
            Please read the following instructions before starting your
            assessment.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-2">
          {ASSESSMENT_INSTRUCTIONS.map((instruction, index) => (
            <li key={index} className="flex w-full items-start">
              <div className="flex w-full max-w-5 select-none items-start justify-start pt-[9px]">
                <div className="bg-primary-dark aspect-square h-1.5 w-1.5 rounded-full"></div>
              </div>
              <p>{instruction.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleStartAssessment}
            className="w-full"
          >
            Start Assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartAssessmentModal;
