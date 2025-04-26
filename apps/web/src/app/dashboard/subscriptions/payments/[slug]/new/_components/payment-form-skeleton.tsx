import { Skeleton } from '@/components/shadcn-ui/skeleton';

const PaymentFormSkeleton = () => {
  return (
    <div className="flex w-full max-w-[500px] flex-col gap-4">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="aspect-square w-full sm:w-[200px]" />
    </div>
  );
};

export default PaymentFormSkeleton;
