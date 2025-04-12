import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

const AssessmentCardSkeleton = () => {
  return (
    <Card className="flex w-full flex-col items-start justify-center gap-4 overflow-hidden md:p-5">
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-10 w-1/2" />
    </Card>
  );
};

export default AssessmentCardSkeleton;
