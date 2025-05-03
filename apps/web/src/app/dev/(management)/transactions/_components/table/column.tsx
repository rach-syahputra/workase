'use client';

import { Ellipsis } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { cn, formatTableDate } from '@/lib/utils';
import { GetTransactionColumnsRequest, ITransactionColumn } from './interface';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import ViewPaymentProofModal from '../view-payment-proof-modal';

export const getTransactionColumns = ({
  onCreatedAtClick,
  handlePayment,
}: GetTransactionColumnsRequest): ColumnDef<ITransactionColumn>[] => [
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="w-[100px]">{row.original.category}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="w-[200px]">{row.original.user.email}</div>
    ),
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
    accessorKey: 'paymentProof',
    header: 'Payment Proof',
    cell: ({ row }) => {
      const paymentProof = row.original.paymentProof;

      return (
        <div className="w-[150px]">
          {paymentProof ? (
            <ViewPaymentProofModal paymentProof={paymentProof || ''} />
          ) : (
            <p className="text-primary-gray">No payment proof.</p>
          )}
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
      const paymentStatus = row.original.payment.status;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis size={16} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.id)}
              className="cursor-pointer"
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={
                paymentStatus === 'CONFIRMED' || paymentStatus === 'REJECTED'
              }
              onClick={() =>
                handlePayment({
                  subscriptionId: row.original.id,
                  subscriptionPaymentId: row.original.payment.id,
                  paymentStatus: 'CONFIRMED',
                })
              }
              className="cursor-pointer text-green-500"
            >
              Confirm payment
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={
                paymentStatus === 'CONFIRMED' || paymentStatus === 'REJECTED'
              }
              onClick={() =>
                handlePayment({
                  subscriptionId: row.original.id,
                  subscriptionPaymentId: row.original.payment.id,
                  paymentStatus: 'REJECTED',
                })
              }
              className="cursor-pointer text-red-500"
            >
              Reject payment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
