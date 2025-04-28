'use client';

import { useSubscriptionPlanContext } from '@/context/subscription-plan-context';
import { useUserStatsContext } from '@/context/user-stats-context';
import { Button } from '@/components/shadcn-ui/button';

interface ExtendPlanModalProps {
  onCloseModal: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ExtendPlanModal = ({
  onCloseModal,
  onSubmit,
  isSubmitting,
}: ExtendPlanModalProps) => {
  const { activeSubscriptionPlan } = useSubscriptionPlanContext();
  const { userStats } = useUserStatsContext();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        You are currently on the <strong>{userStats?.subscription.plan}</strong>{' '}
        plan. Would you like to extend your subscription with{' '}
        {userStats?.subscription.plan === activeSubscriptionPlan.id ? (
          'the same '
        ) : (
          <strong>{activeSubscriptionPlan.id} </strong>
        )}
        plan?
      </p>
      <div className="flex w-full items-center justify-between gap-4">
        <Button
          onClick={onCloseModal}
          disabled={isSubmitting}
          variant="outline"
          className="w-full"
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting} className="w-full">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ExtendPlanModal;
