import * as React from 'react';

import { useSearchJob } from '@/context/search-job-context';
import JobCard from '../example/_components/card';

import { FaLocationDot } from 'react-icons/fa6';
export function NearestJobs() {
  const { jobs } = useSearchJob();

  return (
    <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
      {jobs.length > 0 && (
        <>
          <div className="font-geist flex items-center justify-center gap-1 text-[16.0px] text-sm font-medium md:my-5">
            <FaLocationDot className="text-red-500 scale-110" />
            Opportunities Around Your Location
          </div>

          <div className="my-4">
            {jobs.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard
                    id={job.id}
                    slug={job.slug}
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
