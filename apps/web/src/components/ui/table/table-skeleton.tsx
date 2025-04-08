import { Skeleton } from '@/components/shadcn-ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-5 gap-x-8 py-2">
      <div className="col-span-1 flex flex-col items-start gap-4">
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
        <Skeleton className="h-6 w-2/3 bg-gray-200" />
      </div>
      <div className="col-span-1 flex flex-col items-start gap-4">
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
      </div>
      <div className="col-span-1 flex flex-col items-start gap-4">
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-4/5 bg-gray-200" />
        <Skeleton className="h-6 w-4/5 bg-gray-200" />
      </div>
      <div className="col-span-1 flex flex-col items-start gap-4">
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
        <Skeleton className="h-6 w-4/5 bg-gray-200" />
      </div>
      <div className="col-span-1 flex flex-col items-start gap-4">
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-6 w-1/4 bg-gray-200" />
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-6 w-1/2 bg-gray-200" />
      </div>
    </div>
  );
};

export default TableSkeleton;
