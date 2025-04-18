/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn, formatTableDate } from '@/lib/utils';
import { UserAssessmentStatus } from '@/lib/interfaces/user-assessment';
import { GenerateCertificateTokenRequest } from '@/lib/interfaces/api-request/certificate';
import { generateCertificateToken } from '@/lib/apis/certificate';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/shadcn-ui/button';
import ClaimCertificateModal from '../claim-certificate-modal';
import { ICertificate } from '@/lib/interfaces/certificate';

export interface IUserAssessmentColumn {
  id: string;
  skill: {
    id: string;
    title: string;
  };
  score: number;
  status: UserAssessmentStatus;
  createdAt: string;
  certificate?: ICertificate | null;
}

export const columns: ColumnDef<IUserAssessmentColumn>[] = [
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
    header: 'Enrollment Date',
    cell: ({ row }) => (
      <div className="w-[200px]">
        {formatTableDate(new Date(row.original.createdAt))}
      </div>
    ),
  },
  {
    accessorKey: 'certificate',
    header: 'Certificate',
    cell: ({ row }) => {
      // TO DO: retrieve userId from user session
      return (
        <ClaimCertificateModal
          status={row.original.status}
          certificateSlug={row.original.certificate?.slug}
          userAssessmentId={row.original.id}
        />
      );
    },
  },
];
