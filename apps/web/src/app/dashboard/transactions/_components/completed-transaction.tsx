'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { OrderType } from '@/lib/interfaces/api-request/filter';
import { getSubscriptions } from '@/lib/apis/subscription';
import { ICompletedTransactionColumn } from './table/interface';
import AppPagination from '@/components/ui/pagination';
import { DataTable } from '@/components/ui/table/data-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import { Card } from '@/components/shadcn-ui/card';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import {
  IFetchGetSubscriptionsRequest,
  SubscriptionCategoryType,
} from '@/lib/interfaces/subscription';
import { getCompletedTransactionColumns } from './table/column';
import { orderBy } from 'cypress/types/lodash';

const CompletedTransaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [columns, setColumns] = useState<
    ColumnDef<ICompletedTransactionColumn>[]
  >([]);
  const [tableData, setTableData] = useState<ICompletedTransactionColumn[]>([]);

  const initiateColumns = () => {
    setColumns(
      getCompletedTransactionColumns({
        onCreatedAtClick: handleCreateAtOrderChange,
      }),
    );
  };

  const fetchGetSubscriptions = async (req?: IFetchGetSubscriptionsRequest) => {
    setIsLoading(true);

    const response = await getSubscriptions({
      page: req?.page || 1,
      order: req?.order || 'desc',
      limit: req?.limit || 8,
      status: ['CONFIRMED', 'REJECTED'],
    });
    const subscriptions = response.data?.subscriptions;
    const pagination = response.data?.pagination;

    if (response.success && subscriptions) {
      setTableData(
        subscriptions.map((subscription) => ({
          id: subscription.id,
          createdAt: subscription.payment.createdAt,
          category: subscription.category as SubscriptionCategoryType,
          payment: {
            id: subscription.payment.id,
            slug: subscription.payment.slug,
            status: subscription.payment.paymentStatus,
          },
          paymentProof: subscription.payment.paymentProof,
          price: subscription.payment.totalPrice,
        })),
      );
      setPage(pagination?.page || 1);
      setTotalPages(pagination?.totalPages || 0);
    }

    setIsLoading(false);
  };

  const handlePageChange = async (page: number) => {
    await fetchGetSubscriptions({
      status: ['CONFIRMED', 'REJECTED'],
      page,
      limit,
      order: createdAtOrder,
    });
  };

  const handleCreateAtOrderChange = async () => {
    const updatedOrder = createdAtOrder === 'desc' ? 'asc' : 'desc';

    setCreatedAtOrder(updatedOrder);
    await fetchGetSubscriptions({
      status: ['CONFIRMED', 'REJECTED'],
      page,
      limit,
      order: updatedOrder,
    });
  };

  useEffect(() => {
    fetchGetSubscriptions();
  }, []);

  useEffect(() => {
    initiateColumns();
  }, [page, limit, createdAtOrder]);

  return (
    <Card className="flex w-full flex-1 flex-col items-start justify-between gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <UserDashboardHeader
        title="Completed Transaction"
        description="View all confirmed or rejected transactions."
      />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={columns} pageSize={8} data={tableData} />
          {totalPages > 1 && (
            <AppPagination
              page={page}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default CompletedTransaction;
