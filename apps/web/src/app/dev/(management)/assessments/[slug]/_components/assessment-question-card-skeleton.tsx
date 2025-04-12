import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

const AssessmentQuestionCardSkeleton = () => {
  return (
    <Card className="flex flex-col gap-3 py-4 md:p-4">
      <Skeleton className="h-4 w-44" />
      <Skeleton className="aspect-square w-[200px]" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </Card>
  );
};

export default AssessmentQuestionCardSkeleton;
