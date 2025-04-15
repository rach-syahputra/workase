import { ChevronLeft, ChevronRight, SprayCan } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Button } from '@/components/shadcn-ui/button';

interface AssessmentSessionPaginationProps {
  className?: string;
}

const AssessmentSessionPagination = ({
  className,
}: AssessmentSessionPaginationProps) => {
  const { page, handlePagination } = useAssessmentSessionContext();

  return (
    <div
      className={cn(
        'col-span-1 hidden h-full items-center justify-between gap-2 md:flex',
        className,
      )}
    >
      <Button
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1}
        className="w-full flex-1 font-bold"
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePagination(page + 1)}
        disabled={page === 25}
        className="w-full flex-1 font-bold"
      >
        Next
      </Button>
    </div>
  );
};

const AssessmentSessionPaginationMobile = ({
  className,
}: AssessmentSessionPaginationProps) => {
  const { page, handlePagination } = useAssessmentSessionContext();

  return (
    <div
      className={cn(
        'border-border fixed bottom-0 flex w-full items-center justify-between gap-4 border-t bg-white px-4 py-3 md:hidden',
        className,
      )}
    >
      <Button
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1}
        className="min-h-fit w-full"
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePagination(page + 1)}
        disabled={page === 25}
        className="min-h-fit w-full"
      >
        Next
      </Button>
    </div>
  );
};

export { AssessmentSessionPagination, AssessmentSessionPaginationMobile };
