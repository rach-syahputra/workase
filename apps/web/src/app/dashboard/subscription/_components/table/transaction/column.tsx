'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { cn, formatTableDate } from '@/lib/utils';
import { GetTransactionColumnsRequest, ITransactionColumn } from './interface';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';
import { Button } from '@/components/shadcn-ui/button';
import ViewPaymentProofModal from '../../view-payment-proof-modal';

export const getTransactionColumns = ({
  onCreatedAtClick,
}: GetTransactionColumnsRequest): ColumnDef<ITransactionColumn>[] => [
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="w-[120px]">{row.original.category}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="w-[80px] font-bold">${row.original.price}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.payment.status;

      return (
        <div className="w-[120px]">
          <span
            className={cn('rounded-md px-3 py-2 text-xs font-medium', {
              'bg-yellow-400 text-yellow-800': status === 'PENDING',
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
      <div className="w-[160px]">
        {formatTableDate(new Date(row.original.payment.createdAt))}
      </div>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const slug = row.original.payment.slug;
      const status = row.original.payment.status;
      const paymentProof = row.original.paymentProof;

      return (
        <div className="w-[150px]">
          {paymentProof ? (
            <ViewPaymentProofModal paymentProof={paymentProof || ''} />
          ) : !paymentProof && status === 'REJECTED' ? (
            <p className="text-primary-gray">No payment proof.</p>
          ) : (
            <Button asChild>
              <Link
                href={`/dashboard/subscription/payments/${slug}/new`}
                aria-label="Submit payment page"
              >
                Submit Payment
              </Link>
            </Button>
          )}
        </div>
      );
    },
  },
];
