'use client';

import { cn } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Card } from '@/components/shadcn-ui/card';
import AssessmentSessionCountdown from './assessment-session-countdown';
import { AssessmentSessionPagination } from './assessment-session-pagination';

interface AssessmentSessionHeaderItemProps {
  title: string;
  value: string;
  className?: string;
}

const AssessmentSessionHeader = () => {
  const { onTopOfScreen, currentQuestion } = useAssessmentSessionContext();

  return (
    <div className="bg-primary-gray-background">
      <div
        className={cn(
          'border-border bg-primary-gray-background fixed left-[50%] top-0 z-40 w-full max-w-[1200px] -translate-x-[50%] border-b px-4 py-4 transition-all duration-300',
          {
            'top-assessment-session-navbar-height': onTopOfScreen,
          },
        )}
      >
        <Card
          className={cn(
            'h-assessment-session-header-height mx-auto grid w-full max-w-screen-lg grid-cols-3 items-center gap-4 px-4 md:grid-cols-3 md:items-center md:justify-between md:px-6',
          )}
        >
          <AssessmentSessionHeaderItem
            title="Question No:"
            value={currentQuestion?.number?.toString() || '1'}
            className="col-span-2 md:col-span-1"
          />
          <AssessmentSessionCountdown className="col-span-1 flex items-center justify-start gap-2 md:col-span-1" />
          <AssessmentSessionPagination className="md:col-span-1" />
        </Card>
      </div>
    </div>
  );
};

const AssessmentSessionHeaderItem = ({
  title,
  value,
  className,
}: AssessmentSessionHeaderItemProps) => {
  return (
    <div className={cn('flex items-center justify-start gap-2', className)}>
      <span className="text-primary-gray text-xs md:text-sm">{title}</span>
      <span className="line-clamp-1 text-sm font-bold md:text-base">
        {value}
      </span>
    </div>
  );
};

export default AssessmentSessionHeader;
