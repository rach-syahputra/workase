'use client';

import { useEffect } from 'react';

import { useDeveloperTransactionContext } from '@/context/developer-transaction-context';
import { DataTable } from '@/components/ui/table/data-table';
import { Card } from '@/components/shadcn-ui/card';
import TableSkeleton from '@/components/ui/table/table-skeleton';
import AppPagination from '@/components/ui/pagination';
import PaymentStatusSelect from './payment-status-select';

const BrowseTransactions = () => {
  const {
    isLoading,
    page,
    setPage,
    totalPages,
    columns,
    tableData,
    fetchGetSubscriptions,
  } = useDeveloperTransactionContext();

  useEffect(() => {
    fetchGetSubscriptions();
  }, []);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="heading-4 font-semibold">Browse Transaction</h2>

      <PaymentStatusSelect />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={columns} pageSize={10} data={tableData} />
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

export default BrowseTransactions;
