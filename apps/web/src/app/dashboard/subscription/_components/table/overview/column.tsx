'use client';

import { ColumnDef } from '@tanstack/react-table';

import { cn, formatTableDate } from '@/lib/utils';
import { GetOverviewColumnsRequest, IOverviewColumn } from './interface';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';

export const getOverviewColumns = ({
  onCreatedAtClick,
}: GetOverviewColumnsRequest): ColumnDef<IOverviewColumn>[] => [
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <div className="w-[120px] font-medium">{row.original.category}</div>
    ),
  },
  {
    accessorKey: 'startedAt',
    header: () => (
      <TableHeaderOrderButton label="Started At" onClick={onCreatedAtClick} />
    ),
    cell: ({ row }) => (
      <div className="w-[160px]">
        {formatTableDate(new Date(row.original.startedAt))}
      </div>
    ),
  },
  {
    accessorKey: 'expiredAt',
    header: () => (
      <TableHeaderOrderButton label="Expired At" onClick={onCreatedAtClick} />
    ),
    cell: ({ row }) => (
      <div className="w-[160px]">
        {formatTableDate(new Date(row.original.expiresAt!))}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.subscriptionStatus;

      return (
        <div className="w-[120px] font-medium">
          <span
            className={cn('rounded-md px-3 py-2 uppercase', {
              'bg-green-400 text-green-700': status === 'active',
              'bg-red-400 text-red-700': status === 'expired',
              'bg-yellow-400 text-yellow-700': status === 'upcoming',
            })}
          >
            {status}
          </span>
        </div>
      );
    },
  },
];
