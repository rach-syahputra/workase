'use client';

import { useCallback, useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { OrderType } from '@/lib/interfaces/api-request/filter';
import { getSubscriptions } from '@/lib/apis/subscription';
import { SubscriptionCategoryType } from '@/lib/interfaces/subscription';
import { GetSubscriptionCategoryType } from '@/lib/interfaces/api-request/subscription';

import AppPagination from '@/components/ui/pagination';
import { DataTable } from '@/components/ui/table/data-table';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import { Card } from '@/components/shadcn-ui/card';
import { getOverviewColumns } from './table/overview/column';
import { IOverviewColumn } from './table/overview/interface';
import SubscriptionCategorySelect from './subscription-category-select';

const Overview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [category, setCategory] = useState<GetSubscriptionCategoryType>('ALL');
  const [columns, setColumns] = useState<ColumnDef<IOverviewColumn>[]>([]);
  const [tableData, setTableData] = useState<IOverviewColumn[]>([]);

  const initiateColumns = useCallback(() => {
    setColumns(
      getOverviewColumns({
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
      status: ['CONFIRMED'],
      category,
    });
    const subscriptions = response.data?.subscriptions;
    const pagination = response.data?.pagination;

    if (response.success && subscriptions) {
      initiateColumns();

      setTableData(
        subscriptions.map((subscription) => ({
          id: subscription.id,
          expiresAt: subscription.expiresAt,
          startedAt: subscription.startedAt,
          category: subscription.category as SubscriptionCategoryType,
        })),
      );
      setPage(pagination?.page || 1);
      setTotalPages(pagination?.totalPages || 0);
    }

    setIsLoading(false);
  }, [page, category, limit, createdAtOrder, initiateColumns]);

  useEffect(() => {
    fetchGetSubscriptions();
  }, [fetchGetSubscriptions]);

  return (
    <Card className="flex w-full flex-1 flex-col items-start justify-between gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <h2 className="heading-2">Overview</h2>

      <SubscriptionCategorySelect setCategory={setCategory} />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={columns} pageSize={8} data={tableData} />
          {totalPages > 1 && (
            <AppPagination
              disabled={isLoading}
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

export default Overview;
