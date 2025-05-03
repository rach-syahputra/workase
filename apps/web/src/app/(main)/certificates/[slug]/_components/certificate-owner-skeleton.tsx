import { cn } from '@/lib/utils';
import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

interface CertificateOwnerSkeletonProps {
  className?: string;
}

const CertificateOwnerSkeleton = ({
  className,
}: CertificateOwnerSkeletonProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4',
        className,
      )}
    >
      <Card className="flex w-full flex-col items-center justify-center gap-4 p-6">
        <Skeleton className="aspect-square w-[84px] rounded-full" />
        <Skeleton className="h-6 w-full" />
      </Card>
    </div>
  );
};

export default CertificateOwnerSkeleton;
