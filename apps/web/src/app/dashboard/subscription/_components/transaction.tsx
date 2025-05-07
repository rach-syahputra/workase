'use client';

import { useCallback, useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { OrderType } from '@/lib/interfaces/api-request/filter';
import { getSubscriptions } from '@/lib/apis/subscription';
import {
  GetSubscriptionCategoryType,
  GetSubscriptionStatusType,
} from '@/lib/interfaces/api-request/subscription';
import { SubscriptionCategoryType } from '@/lib/interfaces/subscription';
import { ITransactionColumn } from './table/transaction/interface';
import AppPagination from '@/components/ui/pagination';
import { DataTable } from '@/components/ui/table/data-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import { Card } from '@/components/shadcn-ui/card';
import PaymentStatusSelect from './payment-status-select';
import { getTransactionColumns } from './table/transaction/column';
import SubscriptionCategorySelect from './subscription-category-select';

const Transaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<GetSubscriptionStatusType[]>(['ALL']);
  const [category, setCategory] = useState<GetSubscriptionCategoryType>('ALL');
  const [columns, setColumns] = useState<ColumnDef<ITransactionColumn>[]>([]);
  const [tableData, setTableData] = useState<ITransactionColumn[]>([]);

  const initiateColumns = useCallback(() => {
    setColumns(
      getTransactionColumns({
        onCreatedAtClick: () =>
          setCreatedAtOrder(createdAtOrder === 'desc' ? 'asc' : 'desc'),
      }),
    );
  }, [createdAtOrder]);

  const fetchGetSubscriptions = useCallback(async () => {
    setIsLoading(true);

    const response = await getSubscriptions({
      page,
      order: createdAtOrder,
      limit,
      status,
      category,
    });
    const subscriptions = response.data?.subscriptions;
    const pagination = response.data?.pagination;

    if (response.success && subscriptions) {
      initiateColumns();

      setTableData(
        subscriptions.map((subscription) => ({
          id: subscription.id,
          category: subscription.category as SubscriptionCategoryType,
          payment: {
            id: subscription.payment.id,
            slug: subscription.payment.slug,
            status: subscription.payment.paymentStatus,
            createdAt: subscription.payment.createdAt,
          },
          paymentProof: subscription.payment.paymentProof,
          price: subscription.payment.totalPrice,
        })),
      );
      setPage(pagination?.page || 1);
      setTotalPages(pagination?.totalPages || 0);
    }

    setIsLoading(false);
  }, [page, category, limit, status, createdAtOrder, initiateColumns]);

  useEffect(() => {
    fetchGetSubscriptions();
  }, [fetchGetSubscriptions]);

  return (
    <Card className="flex w-full flex-1 flex-col items-start justify-between gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <h2 className="heading-2">Billing History</h2>

      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <SubscriptionCategorySelect setCategory={setCategory} />
        <PaymentStatusSelect setStatus={setStatus} />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={columns} pageSize={8} data={tableData} />
          {totalPages > 1 && (
            <AppPagination
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default Transaction;
