'use client';

import Countdown from 'react-countdown';
import { Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface AssessmentSessionCountdownProps {
  className?: string;
}

const AssessmentSessionCountdown = ({
  className,
}: AssessmentSessionCountdownProps) => {
  const { userAssessment, setIsSessionOver } = useAssessmentSessionContext();
  const { toast } = useToast();

  const handleSessionOver = () => {
    setIsSessionOver(true);

    toast({
      title: 'Time is Up!',
      description: 'Please submit your assessment.',
      duration: 5,
    });
  };

  return userAssessment?.startTime ? (
    <div className={cn('flex items-center justify-center', className)}>
      <Clock size={16} className="text-primary-gray" />
      <div className="w-12">
        <Countdown
          date={userAssessment.startTime?.getTime() + 30 * 60 * 1000} // 30 minutes from startDate
          onComplete={handleSessionOver}
          renderer={({ minutes, seconds }) => (
            <span className="text-lg font-bold md:text-base">
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </span>
          )}
        />
      </div>
    </div>
  ) : (
    <span>Time Left: 00:00</span>
  );
};

export default AssessmentSessionCountdown;
