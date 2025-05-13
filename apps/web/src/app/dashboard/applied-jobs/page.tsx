'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/shadcn-ui/input';
import { Button } from '@/components/shadcn-ui/button';
import AppliedJobsTableComponent from './_components/applied-jobs-table-component';

export interface IApplyListAndDetailProps {}
export interface applicationDetail {
  jobId: string;
  appliedAt: Date;
  hrReview: string;
  interviewSchedule: Date;
  job: {
    company: { name: string };
    title: string;
  };
  preselectionPassed: boolean;
  status: 'WAITING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
}
export default function ApplyListAndDetail(props: IApplyListAndDetailProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('desc');
  const [titleFilter, setTitleFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const fetchData = React.useCallback(async () => {
    try {
      if (!session?.user?.accessToken) {
        return;
      }
      const axiosInstance = axiosPrivate(
        session?.user?.accessToken as string,
        'application/json',
      );

      const response = await axiosInstance.get(
        `/job-applications/applications`,
        {
          params: {
            limit: Math.max(1, Math.min(100, limit)),
            skip: Math.max(0, skip),
            sortField: ['title'].includes(sortField) ? sortField : 'title',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc',
            title: activeFilter || undefined,
          },
        },
      );
      const appliedJobs = response.data.data.applications || [];
      setData(appliedJobs);
      setHasMore(response.data.data.hasMore);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      console.log(err);
    }
  }, [
    session?.user?.accessToken,
    limit,
    skip,
    sortField,
    sortOrder,
    activeFilter,
  ]);

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchData();
    }
  }, [session, fetchData]);

  const handleSearch = () => {
    setActiveFilter(titleFilter);
    setSkip(0);
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const nextPage = () => {
    if (hasMore) setSkip(skip + limit);
  };
  const prevPage = () => {
    if (skip > 0) {
      const newSkip = Math.max(0, skip - limit);
      setSkip(newSkip);
    }
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
      <div className="">
        <div className="flex justify-center text-[24px] font-bold md:justify-normal">
          Applied Jobs
        </div>
        <div className="flex justify-center text-sm font-light text-gray-500 md:justify-normal">
          Look your applied jobs list and detail
        </div>
      </div>
      <div className="my-4 w-full rounded-md border bg-white px-4 pb-[30px] pt-2 md:py-4 md:pb-[30px]">
        <div className="text-[22px] font-bold">Applied Jobs List</div>

        {/* Filter Control */}
        <div className="mb-3 flex flex-col gap-2 pt-2 md:flex-row">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search by title"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {/* Table Component */}
        <div className="text-sm font-light text-gray-500">
          To look your application detail, please click one of the line below
        </div>
        <AppliedJobsTableComponent
          data={data}
          totalCount={totalCount}
          skip={skip}
          currentPage={currentPage}
          totalPages={totalPages}
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          prevPage={prevPage}
          nextPage={nextPage}
          hasMore={hasMore}
        />
      </div>
    </UserDashboardContainer>
  );
}
