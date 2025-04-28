'use client';

import { useSubscriptionPlanContext } from '@/context/subscription-plan-context';

import { Button } from '@/components/shadcn-ui/button';

interface UpgradePlanModalProps {
  onCloseModal: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const UpgradePlanModal = ({
  onCloseModal,
  onSubmit,
  isSubmitting,
}: UpgradePlanModalProps) => {
  const { activeSubscriptionPlan } = useSubscriptionPlanContext();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        Are you sure you want to upgrade to the{' '}
        <strong>{activeSubscriptionPlan.label}</strong> plan?
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

export default UpgradePlanModal;
