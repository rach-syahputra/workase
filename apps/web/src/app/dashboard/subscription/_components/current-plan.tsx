'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { capitalizeString, formatSubscriptionTimeLeft } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useUserStatsContext } from '@/context/user-stats-context';
import { Button } from '@/components/shadcn-ui/button';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

const CurrentPlan = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const { userStats } = useUserStatsContext();
  const [isLoading, setIsLoading] = useState<boolean>(!!userStats);

  const handleUpgradePlan = () => {
    if (!session?.user?.isVerified) {
      toast({
        title: 'Email is Unverified',
        description: 'Verify your email before upgrading plan',
        variant: 'destructive',
        duration: 5000,
        action: (
          <Link
            href="/profile-management/verification"
            className="rounded-md border border-white px-3 py-2 text-sm"
          >
            Verify Email
          </Link>
        ),
      });
    } else {
      router.push('/subscription');
    }
  };

  useEffect(() => {
    if (userStats?.subscription) setIsLoading(false);
  }, [userStats]);

  return (
    <div className="flex flex-col items-start gap-4 py-4">
      <div className="flex flex-col items-start">
        <div className="flex h-12 items-center justify-center gap-2">
          <span className="text-primary-gray w-28 text-sm font-medium">
            Current Plan:
          </span>
          {!isLoading && userStats?.subscription.plan ? (
            <p className="text-xl font-bold text-green-500">
              {capitalizeString(userStats?.subscription.plan)}
            </p>
          ) : (
            <Skeleton className="h-7 w-[100px]" />
          )}
        </div>
        <div className="flex h-12 items-center justify-center gap-2">
          <span className="text-primary-gray w-28 text-sm font-medium">
            Ends In:
          </span>
          {!isLoading && userStats?.subscription.plan ? (
            <p className="font-bold">
              {userStats.subscription.expiresAt
                ? formatSubscriptionTimeLeft(
                    new Date(userStats.subscription.expiresAt),
                  )
                : '-'}
            </p>
          ) : (
            <Skeleton className="h-7 w-[100px]" />
          )}
        </div>
        <div className="flex h-12 items-center justify-center gap-2">
          <span className="text-primary-gray w-28 text-sm font-medium">
            Manage:
          </span>
          {!isLoading && userStats ? (
            <Button asChild variant="dark" className="w-fit">
              {userStats?.subscription.plan !== 'FREE' ||
              !userStats.subscription.plan ? (
                <Button onClick={handleUpgradePlan}>Extend Plan</Button>
              ) : (
                <Button onClick={handleUpgradePlan}>Upgrade Plan</Button>
              )}
            </Button>
          ) : (
            <Skeleton className="h-7 w-[100px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentPlan;
