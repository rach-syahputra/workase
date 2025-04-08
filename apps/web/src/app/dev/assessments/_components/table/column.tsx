'use client';

import { Button } from '@/components/shadcn-ui/button';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export interface IAssessmentColumn {
  id: string;
  skill: string;
  totalQuestions: number;
  updatedAt: string;
}

export const columns: ColumnDef<IAssessmentColumn>[] = [
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
    header: 'Last Updated',
    cell: ({ row }) => (
      <div className="w-[200px]">{row.original.updatedAt}</div>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <Button asChild>
          <Link href={`/dev/assessments/${row.original.id}`}>Manage</Link>
        </Button>
      );
    },
  },
];
