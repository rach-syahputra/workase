'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import {
  addSubscription,
  getSubscriptionTransactionStatus,
} from '@/lib/apis/subscription';
import { useAppToast } from '@/hooks/use-app-toast';
import { useSubscriptionPlanContext } from '@/context/subscription-plan-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/shadcn-ui/dialog';
import Icon from '@/components/ui/icon';
import LoadingOverlay from '@/components/ui/loading-overlay';

const SubscribeModal = () => {
  const router = useRouter();
  const { appToast } = useAppToast();
  const { activeSubscriptionPlan } = useSubscriptionPlanContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [hasPendingTransaction, setHasPendingTransaction] =
    useState<boolean>(false);

  const handleStartYourPlan = async () => {
    setIsLoading(true);

    const response = await getSubscriptionTransactionStatus();
    const pendingTransaction = response.data?.subscription.pendingTransaction;

    if (pendingTransaction) {
      setHasPendingTransaction(true);
    }

    setOpen(true);
    setIsLoading(false);
  };

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);

    const response = await addSubscription({
      category: activeSubscriptionPlan.id,
      paymentStatus: 'PENDING',
      totalPrice: activeSubscriptionPlan.id === 'PROFESSIONAL' ? 5 : 1.5,
    });

    if (response.success) {
      const paymentSlug = response.data?.subscription.payment.slug;
      router.push(`/dashboard/subscriptions/payments/${paymentSlug}/new`);
    } else {
      if (response.code === 'ERR_NETWORK') {
        // TO DO: add toast action to redirect to the login page
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
        <div
          onClick={handleStartYourPlan}
          className="flex w-full flex-col gap-2"
        >
          <Button className="hover:bg-primary-blue-hover group h-10 w-full text-base tracking-wide transition-all duration-300 ease-in-out">
            Start Your Plan
            <div className="relative flex h-full items-center justify-center pr-6">
              <Icon
                icon={faArrowRight}
                className="absolute right-0 transition-all duration-300 ease-in-out group-hover:-right-0.5"
              />
            </div>
          </Button>
        </div>

        <DialogContent className="max-w-screen-sm">
          <DialogHeader>
            <DialogTitle className="sr-only">Subscribe Form</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4">
            {hasPendingTransaction ? (
              <>
                <p className="text-center">
                  You have a pending payment. Please complete it or wait for
                  approval before starting a new upgrade.
                </p>
                <div className="flex w-full items-center justify-between gap-4">
                  <Button
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      router.push('/dashboard/subscriptions?tab=pending')
                    }
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    View Transaction
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-center">
                  Are you sure you want to upgrade to the{' '}
                  <strong>{activeSubscriptionPlan.label}</strong> plan?
                </p>
                <div className="flex w-full items-center justify-between gap-4">
                  <Button
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {isLoading && <LoadingOverlay label="Starting your plan" />}
    </>
  );
};

export default SubscribeModal;
