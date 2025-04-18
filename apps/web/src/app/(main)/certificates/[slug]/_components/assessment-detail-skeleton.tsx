import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { cn } from '@/lib/utils';

interface AssessmentDetailSkeletonProps {
  className?: string;
}

const AssessmentDetailSkeleton = ({
  className,
}: AssessmentDetailSkeletonProps) => {
  return (
    <section className={cn('h-[400px] w-full', className)}>
      <div className="flex h-fit w-full flex-col items-start justify-between gap-6 p-4">
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </section>
  );
};

export default AssessmentDetailSkeleton;
