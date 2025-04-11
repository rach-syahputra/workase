import * as React from 'react';
import { useEffect, useState } from 'react';

import { axiosPublic } from '@/lib/axios';
import { Job, useSearchJob } from '@/context/search-job-context';
import JobCard from '../example/_components/card';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn-ui/carousel';
import { FaLocationDot } from 'react-icons/fa6';
export function NearestJobs() {
  //   const [jobs, setJobs] = useState<Job[]>([]);
  const { jobs } = useSearchJob();
  //   useEffect(() => {
  //     const fetchJobs = async () => {
  //       try {
  //         const nearestJobs = await axiosPublic.get(
  //           '/jobs?sort=createdAt&order=desc&limit=5',
  //         );
  //         const data = nearestJobs.data as { data: Job[] };
  //         setJobs(data.data);
  //         console.log('ini jobs dari carausel', data.data);
  //       } catch (error) {
  //         console.error('Error fetching jobs:', error);
  //       }
  //     };

  //     fetchJobs();
  //   }, []);

  return (
    <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
      {jobs.length > 0 && (
        <>
          <div className="font-geist flex items-center justify-center gap-1 text-[16.0px] text-sm font-medium md:my-5">
            <FaLocationDot className="scale-110 text-red-500" />
            Opportunities Around Your Location
          </div>

          <div className="my-4">
            {jobs.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard
                    description={job.description}
                    title={job.title}
                    location={job.company.location}
                    category={job.category}
                    companyName={job.company.name}
                    createdAt={job.createdAt}
                    key={job.id}
                    logoUrl={job.company.logoUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
