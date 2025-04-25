import { Skeleton } from '@/components/shadcn-ui/skeleton';

const PendingTransactionCardSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-4 md:flex-row md:p-4">
      <div className="flex h-full w-full flex-col gap-2 md:w-1/4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <Skeleton className="aspect-square w-full md:h-28 md:w-28" />
    </div>
  );
};

export default PendingTransactionCardSkeleton;
