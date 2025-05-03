import { Skeleton } from '@/components/shadcn-ui/skeleton';

const CertificateSkeleton = () => {
  return (
    <div className="mx-auto aspect-[1056/816] w-full overflow-hidden rounded-md md:max-w-[600px]">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default CertificateSkeleton;
