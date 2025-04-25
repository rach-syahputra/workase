'use client';

import { useEffect } from 'react';

import { usePendingTransactionContext } from '@/context/pending-transaction-context';
import { Card } from '@/components/shadcn-ui/card';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import { Separator } from '@/components/shadcn-ui/separator';
import AppPagination from '@/components/ui/pagination';
import PendingTransactionCard from './pending-transaction-card';
import PendingTransactionCardSkeleton from './pending-transaction-card-skeleton';

const PendingTransactions = () => {
  const {
    isLoading,
    page,
    limit,
    createdAtOrder,
    totalPages,
    subscriptions,
    fetchGetSubscriptions,
    handlePageChange,
  } = usePendingTransactionContext();

  useEffect(() => {
    fetchGetSubscriptions({
      page,
      limit,
      order: createdAtOrder,
    });
  }, []);

  return (
    <Card className="flex w-full flex-1 flex-col items-start justify-between gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <div className="flex w-full flex-col gap-6">
        <UserDashboardHeader
          title="Pending Transaction"
          description="View all transactions awaiting approval or payment confirmation."
        />
        <div className="flex w-full flex-col gap-6">
          {isLoading ? (
            <>
              <PendingTransactionCardSkeleton />
              <Separator />
              <PendingTransactionCardSkeleton />
              <Separator />
              <PendingTransactionCardSkeleton />
            </>
          ) : subscriptions?.length > 0 ? (
            subscriptions.map((subscription, index) => (
              <>
                <PendingTransactionCard
                  key={index}
                  slug={subscription.payment.slug}
                  category={subscription.category}
                  totalPrice={subscription.payment.totalPrice}
                  status={subscription.payment.paymentStatus}
                  createdAt={subscription.payment.createdAt}
                  paymentProof={subscription.payment.paymentProof}
                />
                {index !== subscriptions.length - 1 && <Separator />}
              </>
            ))
          ) : (
            <p className="text-primary-gray text-sm">No transaction.</p>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <AppPagination
          onPageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
      )}
    </Card>
  );
};

export default PendingTransactions;
