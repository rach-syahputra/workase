import { Button } from '@/components/shadcn-ui/button';
import Link from 'next/link';

const CurrentPlan = () => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-primary-gray text-sm font-medium">Current Plan</h2>
        <p className="text-xl font-bold text-green-500">Free</p>
      </div>
      <Button asChild variant="dark" className="w-fit">
        <Link href="/subscription" aria-label="Subscription page">
          Upgrade Plan
        </Link>
      </Button>
    </div>
  );
};

export default CurrentPlan;
