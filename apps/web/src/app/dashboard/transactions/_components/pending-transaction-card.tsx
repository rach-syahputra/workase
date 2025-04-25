import { useRouter } from 'next/navigation';

import { SubscriptionPaymentStatusType } from '@/lib/interfaces/subscription';
import { cn, formatTableDate } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import ViewPaymentProofModal from './view-payment-proof-modal';

interface PendingTransactionCardProps {
  slug: string;
  category: string;
  totalPrice: number;
  status: SubscriptionPaymentStatusType;
  createdAt: string;
  paymentProof: string | null;
}

interface PendingTransactionCardItemProps {
  title: string;
  isPending?: boolean;
  value: string;
}

const PendingTransactionCard = ({
  slug,
  category,
  totalPrice,
  status,
  createdAt,
  paymentProof,
}: PendingTransactionCardProps) => {
  const router = useRouter();

  const handleCompletePayment = () => {
    router.push(`/dashboard/transactions/payments/${slug}/new`);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between md:h-[220px] md:flex-row md:p-4">
      <div className="flex w-full flex-col gap-2">
        <PendingTransactionCardItem title="Category:" value={category} />
        <PendingTransactionCardItem
          title="Total Price:"
          value={`$${totalPrice}`}
        />
        <PendingTransactionCardItem title="Status:" isPending value={status} />
        <PendingTransactionCardItem
          title="Created At:"
          value={formatTableDate(new Date(createdAt))}
        />

        <div className="flex w-full items-center justify-start gap-4">
          <span className="text-primary-gray w-[80px] text-sm md:w-[150px]">
            Action:
          </span>
          <Button
            disabled={!!paymentProof}
            onClick={handleCompletePayment}
            className="w-fit"
          >
            Submit Payment
          </Button>
        </div>
      </div>
      {paymentProof ? (
        <ViewPaymentProofModal paymentProof={paymentProof} />
      ) : (
        <div className="border-border flex aspect-square h-full items-center justify-center rounded-md border p-4">
          <span className="text-primary-gray text-sm">No payment proof</span>
        </div>
      )}
    </div>
  );
};

const PendingTransactionCardItem = ({
  title,
  isPending,
  value,
}: PendingTransactionCardItemProps) => {
  return (
    <div className="flex min-h-8 w-full items-center justify-start gap-4">
      <span className="text-primary-gray w-[80px] text-sm md:w-[150px]">
        {title}
      </span>
      <p
        className={cn('text-sm font-medium md:text-base', {
          'rounded-md bg-yellow-400 px-2 py-1 text-yellow-800': isPending,
        })}
      >
        {value}
      </p>
    </div>
  );
};

export default PendingTransactionCard;
