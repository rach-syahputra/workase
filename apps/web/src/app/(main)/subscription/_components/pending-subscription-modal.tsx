import { Button } from '@/components/shadcn-ui/button';

interface PendingSubscriptionModalProps {
  onCloseModal: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const PendingSubscriptionModal = ({
  onCloseModal,
  onSubmit,
  isSubmitting,
}: PendingSubscriptionModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        You have a pending payment. Please complete it or wait for approval
        before starting a new upgrade.
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
          View Transaction
        </Button>
      </div>
    </div>
  );
};

export default PendingSubscriptionModal;
