'use client';

import Countdown from 'react-countdown';
import { Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

interface AssessmentSessionCountdownProps {
  className?: string;
}

const AssessmentSessionCountdown = ({
  className,
}: AssessmentSessionCountdownProps) => {
  const { userAssessment } = useAssessmentSessionContext();

  const handleComplete = () => {
    alert('Time is up! Submitting your answers...');
    // Add your auto-submit or redirect logic here
  };

  return userAssessment?.startTime ? (
    <div className={cn('flex items-center justify-center', className)}>
      <Clock size={16} className="text-primary-gray" />
      {/* <span className="text-primary-gray text-xs md:text-sm">Time Left:</span> */}
      <div className="w-12">
        <Countdown
          date={userAssessment.startTime?.getTime() + 30 * 60 * 1000} // 30 minutes from startDate
          onComplete={handleComplete}
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
