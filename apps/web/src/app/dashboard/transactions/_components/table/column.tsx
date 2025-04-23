'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { cn, formatTableDate } from '@/lib/utils';
import {
  GetPendingTransactionColumnsRequest,
  IPendingTransactionColumn,
} from './interface';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';
import { Button } from '@/components/shadcn-ui/button';

export const getPendingTransactionColumns = ({
  onCreatedAtClick,
}: GetPendingTransactionColumnsRequest): ColumnDef<IPendingTransactionColumn>[] => [
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="w-[200px]">{row.original.category}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="w-[200px] font-bold">${row.original.price}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.payment.status;

      return (
        <div className="w-[200px]">
          <span className="rounded-md bg-yellow-400 px-3 py-2 text-xs font-medium text-yellow-800">
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
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const isPaymentUploaded = !!row.original.paymentProof;

      return isPaymentUploaded ? (
        <Link
          href="/"
          aria-label="Assessment session page"
          className="hover:text-primary-blue underline transition-all duration-300 ease-in-out"
        >
          Continue Your Assessment
        </Link>
      ) : (
        <Button>Upload Payment Proof</Button>
      );
    },
  },
];
