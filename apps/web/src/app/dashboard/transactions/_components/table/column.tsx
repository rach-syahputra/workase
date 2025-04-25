'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn, formatTableDate } from '@/lib/utils';
import {
  GetCompletedTransactionColumnsRequest,
  ICompletedTransactionColumn,
} from './interface';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';

export const getCompletedTransactionColumns = ({
  onCreatedAtClick,
}: GetCompletedTransactionColumnsRequest): ColumnDef<ICompletedTransactionColumn>[] => [
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="w-[150px]">{row.original.category}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="w-[150px] font-bold">${row.original.price}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.payment.status;

      return (
        <div className="w-[150px]">
          <span
            className={cn('rounded-md px-3 py-2 text-xs font-medium', {
              'bg-green-400 text-green-800': status === 'CONFIRMED',
              'bg-red-400 text-red-800': status === 'REJECTED',
            })}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <TableHeaderOrderButton label="Created At" onClick={onCreatedAtClick} />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">
        {formatTableDate(new Date(row.original.createdAt))}
      </div>
    ),
  },
];
