'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { formatTableDate } from '@/lib/utils';
import { GetAssessmentColumnsRequest, IAssessmentColumn } from './interface';
import { Button } from '@/components/shadcn-ui/button';
import TableHeaderOrderButton from '@/components/ui/table/table-header-order-button';

export const getAssessmentColumns = ({
  onLastUpdatedHeaderClick,
}: GetAssessmentColumnsRequest): ColumnDef<IAssessmentColumn>[] => [
  {
    accessorKey: 'skill',
    header: 'Skill',
    cell: ({ row }) => <div className="w-[200px]">{row.original.skill}</div>,
  },
  {
    accessorKey: 'totalQuestions',
    header: 'Total Questions',
    cell: ({ row }) => (
      <div className="w-[200px]">{row.original.totalQuestions}/25</div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: () => {
      return (
        <TableHeaderOrderButton
          label="Last Updated"
          onClick={onLastUpdatedHeaderClick}
        />
      );
    },
    cell: ({ row }) => (
      <div className="w-[200px]">
        {formatTableDate(new Date(row.original.updatedAt))}
      </div>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <Button asChild>
          <Link href={`/dev/assessments/${row.original.slug}`}>Manage</Link>
        </Button>
      );
    },
  },
];
