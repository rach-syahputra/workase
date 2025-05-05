import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

const CompanyRatingLoading = () => {
  return (
    <Card className="flex h-[295px] w-full flex-col gap-4 p-4 md:h-[160px] md:flex-row">
      <div className="flex h-full w-full items-center justify-center gap-4">
        <Skeleton className="h-full w-2/5" />
        <div className="flex h-full w-3/5 flex-col gap-2">
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-2">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    </Card>
  );
};

export default CompanyRatingLoading;
