'use client';

import { cn } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Progress } from '@/components/shadcn-ui/progress';

interface AssessmentSessionProgressProps {
  className?: string;
}

const AssessmentSessionProgress = ({
  className,
}: AssessmentSessionProgressProps) => {
  const { progress } = useAssessmentSessionContext();

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <div className="hidden w-full items-center justify-between gap-2 text-sm sm:flex">
        <span className="text-primary-gray line-clamp-1">
          Assessment Progress
        </span>
        <span className="font-bold">{progress}%</span>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <Progress value={progress} className={cn('w-full', className)} />
        <span className="font-bold sm:hidden">{progress}%</span>
      </div>
    </div>
  );
};

export default AssessmentSessionProgress;
