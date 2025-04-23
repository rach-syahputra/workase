'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { OrderType } from '@/lib/interfaces/api-request/filter';
import { IPendingTransactionColumn } from './table/interface';
import { Card } from '@/components/shadcn-ui/card';
import AppPagination from '@/components/ui/pagination';
import { DataTable } from '@/components/ui/table/data-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import { getSubscriptions } from '@/lib/apis/subscription';
import { SubscriptionCategoryType } from '@/lib/interfaces/subscription';
import { getPendingTransactionColumns } from './table/column';

const PendingTransactions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [columns, setColumns] = useState<
    ColumnDef<IPendingTransactionColumn>[]
  >([]);
  const [tableData, setTableData] = useState<IPendingTransactionColumn[]>([]);

  const fetchGetSubscriptions = async () => {
    setIsLoading(true);

    const response = await getSubscriptions({
      limit,
      order: createdAtOrder,
      page,
    });

    console.log('response', response);

    if (response.success) {
      setColumns(
        getPendingTransactionColumns({
          onCreatedAtClick: () =>
            setCreatedAtOrder(createdAtOrder === 'desc' ? 'asc' : 'desc'),
        }),
      );
      setTableData(
        response.data?.subscriptions.map((subscription) => ({
          id: subscription.id,
          createdAt: subscription.payment?.createdAt,
          price: 1.5,
          payment: {
            id: subscription.payment.id,
            slug: subscription.payment.slug,
            status: 'PENDING',
          },
          paymentProof: subscription.payment.paymentProof,
          category: subscription.category as SubscriptionCategoryType,
        })) || [],
      );
      setTotalPages(response.data?.pagination.totalPages || 1);
      setPage(page || 1);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGetSubscriptions();
  }, []);

  useEffect(() => {
    fetchGetSubscriptions();
  }, [page, limit, createdAtOrder]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <UserDashboardHeader
        title="Pending Transaction"
        description="View all transactions awaiting approval or payment confirmation."
      />

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

export default PendingTransactions;
