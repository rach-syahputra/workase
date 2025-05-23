'use client';
import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import { axiosPrivate } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { applicationDetail } from '../page';
import { useToast } from '@/hooks/use-toast';
import { GoLinkExternal } from 'react-icons/go';
export interface IDetaiilApplicationProps extends applicationDetail {
  cvUrl: string;
  salaryEstimate: number;
}

export default function DetaiilApplication() {
  const { data: session } = useSession();
  const [data, setData] = useState<IDetaiilApplicationProps>();
  const params = useParams<{ id: string }>();
  const jobId = params.id;

  const { toast } = useToast();
  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.accessToken) return;
      try {
        const axiosInstance = axiosPrivate(
          session?.user?.accessToken as string,
          'application/json',
        );

        const response = await axiosInstance.get(`/job-applications/${jobId}`);
        setData(response.data.data);
      } catch (err) {
        toast({
          title: 'Error',
          description: `Error fetching jobs aplications`,
          variant: 'destructive',
        });
      }
    }
    fetchData();
  }, [jobId, session?.user?.accessToken, toast]);
  return (
    <div>
      <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
        <div className="flex justify-center border-b pb-2 text-[24px] font-bold md:justify-normal">
          Application Detail
        </div>
        <div className="my-4 w-full rounded-md border bg-white px-4 pb-[30px] md:py-4 md:pb-[30px]">
          <div className="flex flex-col gap-2 border-b pb-4 pt-4 md:pt-0">
            <div className="text-[20px] font-semibold">Job Information</div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Company</div>
              <div className="break-all">{data?.job.company.name}</div>
            </div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Job Title</div>
              <div className="break-all">{data?.job.title}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b pb-4 pt-4">
            <div className="text-[20px] font-semibold">Application Info</div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Applied At</div>
              {data && (
                <div className="break-all">
                  {' '}
                  {new Date(data.appliedAt).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Status</div>
              <div className="break-all">
                {' '}
                {data?.status.charAt(0) +
                  (data?.status?.slice(1).toLowerCase() ?? '')}
              </div>
            </div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Pre-selection</div>
              <div className="break-all">
                {' '}
                {data?.preselectionPassed ? 'Complete' : 'Not Taken'}
              </div>
            </div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Interview Schedule</div>
              <div className="break-all">
                {data?.interviewSchedule
                  ? new Date(data.interviewSchedule).toLocaleDateString()
                  : '-'}
              </div>
            </div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">HR Review</div>
              <div className="break-all">
                {' '}
                {data?.hrReview ? data.hrReview : '-'}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <div className="text-[20px] font-semibold">Your Submission</div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Salary Estimate</div>
              <div className="break-all">$ {data?.salaryEstimate} / Month</div>
            </div>
            <div className="grid grid-cols-[150px_1fr]">
              <div className="">Submitted CV</div>
              <div className="break-all">
                <a
                  href={data?.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500"
                >
                  View Your CV
                  <GoLinkExternal />
                </a>
              </div>
            </div>
          </div>
        </div>
      </UserDashboardContainer>
    </div>
  );
}
