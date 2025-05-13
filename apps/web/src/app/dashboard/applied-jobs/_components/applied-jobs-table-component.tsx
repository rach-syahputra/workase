import * as React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';

import { useRouter } from 'next/navigation';
import { MdArrowDownward, MdArrowUpward, MdDelete } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import { applicationDetail } from '../page';
export interface IAppliedJobsTableComponentProps {
  data: applicationDetail[];
  totalCount: number;
  skip: number;
  currentPage: number;
  totalPages: number;
  sortField: string;
  sortOrder: string;
  toggleSort: (field: string) => void;

  prevPage: () => void;
  nextPage: () => void;
  hasMore: boolean;
}

export default function AppliedJobsTableComponent({
  data,
  totalCount,
  skip,
  currentPage,
  totalPages,
  sortField,
  sortOrder,
  toggleSort,

  prevPage,
  nextPage,
  hasMore,
}: IAppliedJobsTableComponentProps) {
  const router = useRouter();
  const formatCategory = (text: string) =>
    text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  return (
    <div>
      <Table className="mt-2">
        <TableCaption>
          Showing {skip + 1}-{Math.min(skip + data.length, totalCount)} of{' '}
          {totalCount} applications
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Date Applied</TableHead>
            <TableHead>Company</TableHead>
            <TableHead onClick={() => toggleSort('title')}>
              Title
              {sortField === 'title' && sortOrder === 'asc' ? (
                <MdArrowUpward className="ml-1 inline" />
              ) : (
                <MdArrowDownward className="ml-1 inline" />
              )}
            </TableHead>

            <TableHead>Status</TableHead>
            <TableHead>Pre Selection Status</TableHead>
            <TableHead>HR Review</TableHead>
            <TableHead className="text-right">Interview Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((data: applicationDetail) => (
              <TableRow
                key={data.job.title + data.job.company.name}
                className={cn(
                  'hover:bg-muted/50 data-[state=selected]:bg-muted min-h-8 cursor-pointer',
                )}
                onClick={() =>
                  router.push(`/dashboard/applied-jobs/${data.jobId}`)
                }
              >
                <TableCell className="font-medium">
                  {new Date(data.appliedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{data.job.company.name}</TableCell>
                <TableCell>{data.job.title}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      `jutsify-center flex-col items-center rounded p-1 text-center ${data.status == 'WAITING' ? 'bg-yellow-400' : data.status == 'REVIEWED' ? 'bg-blue-400' : data.status == 'ACCEPTED' ? 'bg-green-400' : 'bg-red-400'}`,
                    )}
                  >
                    {data.status
                      ? data.status.charAt(0) +
                        data.status.slice(1).toLowerCase()
                      : ''}
                  </div>
                </TableCell>
                <TableCell>
                  {data.preselectionPassed ? 'Complete' : 'Not Taken'}
                </TableCell>
                <TableCell>{data.hrReview ? data.hrReview : '-'}</TableCell>
                <TableCell className="text-right">
                  {data.interviewSchedule
                    ? new Date(data.interviewSchedule).toLocaleDateString()
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                  Page {currentPage} of {totalPages || 1}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={skip === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={!hasMore}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
