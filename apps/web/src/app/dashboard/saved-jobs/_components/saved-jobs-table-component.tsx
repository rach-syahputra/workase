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
import { SavedJobs } from '../page';
import { useRouter } from 'next/navigation';
import { MdArrowDownward, MdArrowUpward, MdDelete } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import { DialogApplyJob } from '@/app/(main)/example/_components/dialog-apply-job';
export interface ISavedJobsTableComponentProps {
  data: SavedJobs[];
  totalCount: number;
  skip: number;
  currentPage: number;
  totalPages: number;
  sortField: string;
  sortOrder: string;
  toggleSort: (field: string) => void;
  handleDelete: (e: { stopPropagation: () => void }, id: string) => void;
  prevPage: () => void;
  nextPage: () => void;
  hasMore: boolean;
}

export default function SavedJobsTableComponent({
  data,
  totalCount,
  skip,
  currentPage,
  totalPages,
  sortField,
  sortOrder,
  toggleSort,
  handleDelete,
  prevPage,
  nextPage,
  hasMore,
}: ISavedJobsTableComponentProps) {
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
          {totalCount} saved jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Location </TableHead>
            <TableHead className="w-[20%]">Company Name</TableHead>
            <TableHead className="w-[26%]" onClick={() => toggleSort('title')}>
              Job Title
              {sortField === 'title' && sortOrder === 'asc' ? (
                <MdArrowUpward className="inline ml-1" />
              ) : (
                <MdArrowDownward className="inline ml-1" />
              )}
            </TableHead>
            <TableHead className="w-[26%]">Category</TableHead>
            <TableHead className="w-[8%]">Apply</TableHead>
            <TableHead className="">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((data: SavedJobs) => (
              <TableRow
                key={data.job.title + data.job.company.name}
                className={cn(
                  'hover:bg-muted/50 data-[state=selected]:bg-muted min-h-8 cursor-pointer',
                )}
                onClick={() => router.push(`/jobs/${data.job.slug}`)}
              >
                <TableCell className="font-medium">
                  {data.job.company.location}
                </TableCell>
                <TableCell>{data.job.company.name}</TableCell>
                <TableCell>{data.job.title}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      `jutsify-center max-w-[120px] flex-col items-center rounded p-1 text-center ${data.job.category == 'FULL_TIME' ? 'bg-green-400' : data.job.category == 'PART_TIME' ? 'bg-blue-300' : data.job.category == 'FREELANCE' ? 'bg-orange-300' : 'bg-gray-300'}`,
                    )}
                  >
                    {formatCategory(data.job.category)}
                  </div>
                </TableCell>
                <TableCell>
                  {' '}
                  <button className="bg-primary-blue flex h-[38px] items-center justify-center rounded-md text-white hover:bg-blue-500">
                    {data?.jobId && (
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-fit"
                      >
                        <DialogApplyJob jobId={data.jobId as string} />
                      </button>
                    )}
                  </button>
                </TableCell>
                <TableCell className="">
                  <button
                    className="flex justify-center w-full p-2"
                    onClick={(e) => handleDelete(e, data.jobId)}
                  >
                    <MdDelete className="scale-150" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
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
