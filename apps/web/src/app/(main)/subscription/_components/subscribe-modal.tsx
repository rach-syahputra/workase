'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { addSubscription } from '@/lib/apis/subscription';
import { useAppToast } from '@/hooks/use-app-toast';
import { useSubscriptionPlanContext } from '@/context/subscription-plan-context';
import { useUserStatsContext } from '@/context/user-stats-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import Icon from '@/components/ui/icon';
import LoadingOverlay from '@/components/ui/loading-overlay';
import PendingSubscriptionModal from './pending-subscription-modal';
import ExtendPlanModal from './extend-plan-modal';
import UpgradePlanModal from './upgrade-plan-modal';

interface SubscribeModalProps {
  className?: string;
}

const SubscribeModal = ({ className }: SubscribeModalProps) => {
  const router = useRouter();
  const { appToast } = useAppToast();
  const { userStats } = useUserStatsContext();
  const { activeSubscriptionPlan } = useSubscriptionPlanContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);

    const response = await addSubscription({
      category: activeSubscriptionPlan.id,
      paymentStatus: 'PENDING',
      totalPrice: activeSubscriptionPlan.id === 'PROFESSIONAL' ? 5 : 1.5,
    });

    if (response.success) {
      const paymentSlug = response.data?.subscription.payment.slug;
      router.push(`/dashboard/subscription/payments/${paymentSlug}/new`);
    } else {
      if (response.code === 'ERR_NETWORK') {
        appToast('ERROR_NETWORK');
      } else if (response.code === 'ERR_UNAUTHENTICATED') {
        appToast('ERROR_UNAUTHENTICATED');
      } else if (response.code === 'ERR_UNAUTHORIZED') {
        appToast('ERROR_UNAUTHORIZED');
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              'hover:bg-primary-blue-hover group flex h-10 w-full text-base tracking-wide transition-all duration-300 ease-in-out',
              className,
            )}
          >
            {userStats?.subscription.plan === 'STANDARD' ||
            userStats?.subscription.plan === 'PROFESSIONAL'
              ? 'Extend Your Plan'
              : 'Upgrade Your Plan'}
            <div className="relative flex h-full items-center justify-center pr-6">
              <Icon
                icon={faArrowRight}
                className="absolute right-0 transition-all duration-300 ease-in-out group-hover:-right-0.5"
              />
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {userStats?.subscription.hasPendingTransaction
                ? 'Pending Subscription'
                : new Date(userStats?.subscription.expiresAt!) > new Date()
                  ? 'Extend Plan'
                  : 'Upgrade Plan'}
            </DialogTitle>
          </DialogHeader>

          {userStats?.subscription.hasPendingTransaction ? (
            <PendingSubscriptionModal
              onCloseModal={() => setOpen(false)}
              onSubmit={() => router.push('/dashboard/subscription')}
              isSubmitting={isSubmitting}
            />
          ) : new Date(userStats?.subscription.expiresAt!) > new Date() ? (
            <ExtendPlanModal
              onCloseModal={() => setOpen(false)}
              onSubmit={handleProceedToPayment}
              isSubmitting={isSubmitting}
            />
          ) : (
            <UpgradePlanModal
              onCloseModal={() => setOpen(false)}
              onSubmit={handleProceedToPayment}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {isLoading && <LoadingOverlay label="Starting your plan" />}
    </>
  );
};

export default SubscribeModal;
