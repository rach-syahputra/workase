import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

const CompanyReviewCardLoading = () => {
  return (
    <div className="w-full p-4">
      <Card className="flex w-full flex-col gap-3 p-4">
        <div className="flex h-9 w-1/2 gap-2 md:w-1/4">
          <Skeleton className="aspect-square h-full" />
          <div className="flex h-full w-full flex-col gap-1">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-3/4 md:w-1/2" />
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Card>
    </div>
  );
};

export default CompanyReviewCardLoading;
