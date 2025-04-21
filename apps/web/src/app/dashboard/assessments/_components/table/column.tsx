'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { cn, formatTableDate } from '@/lib/utils';
import {
  GetAssessmentDiscoveryColumnsRequest,
  IUserAssessmentColumn,
} from './interface';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';
import ClaimCertificateModal from '../claim-certificate-modal';

export const getAssessmentDiscoveryColumns = ({
  onEnrollmentDateClick,
}: GetAssessmentDiscoveryColumnsRequest): ColumnDef<IUserAssessmentColumn>[] => [
  {
    accessorKey: 'skill',
    header: 'Skill',
    cell: ({ row }) => (
      <div className="w-[200px]">{row.original.skill.title}</div>
    ),
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => <div className="w-[200px]">{row.original.score}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="w-[200px]">
          <span
            className={cn(
              'rounded-md bg-green-400 px-3 py-2 text-xs font-medium text-green-800',
              {
                'bg-yellow-400 text-yellow-800': status === 'ON_GOING',
                'bg-red-400 text-red-800': status === 'FAILED',
              },
            )}
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
      <TableHeaderOrderButton
        label="Enrollment Date"
        onClick={onEnrollmentDateClick}
      />
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
      // TO DO: retrieve userId from user session
      const status = row.original.status;
      const sessionToken = row.original.sessionToken;

      return status === 'ON_GOING' ? (
        <Link
          href={`/assessment-session?token=${sessionToken}`}
          aria-label="Assessment session page"
          className="hover:text-primary-blue underline transition-all duration-300 ease-in-out"
        >
          Continue Your Assessment
        </Link>
      ) : (
        <ClaimCertificateModal
          status={row.original.status}
          certificateSlug={row.original.certificate?.slug}
          userAssessmentId={row.original.id}
        />
      );
    },
  },
];
