'use client';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { axiosPublic } from '@/lib/axios';
import { Job, useSearchJob } from '@/context/search-job-context';
import JobCard from '../../example/_components/card';

import { useSearchParams } from 'next/navigation';

export function SearchJobs() {
  const { jobs, fetchJobs } = useSearchJob();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState({
    title: '',
    category: '',
    location: '',
  });

  //  Mencegah efek dipanggil berulang
  const lastQueryRef = useRef(query);

  useEffect(() => {
    const nextQuery = {
      title: searchParams.get('title') || '',
      category: searchParams.get('category') || '',
      location: searchParams.get('location') || '',
    };

    const isDifferent =
      nextQuery.title !== lastQueryRef.current.title ||
      nextQuery.category !== lastQueryRef.current.category ||
      nextQuery.location !== lastQueryRef.current.location;

    if (isDifferent) {
      setQuery(nextQuery);
      lastQueryRef.current = nextQuery;
      fetchJobs(nextQuery);
    }
  }, [searchParams.toString()]);

  return (
    <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
      <div className="my-4">
        {jobs.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                description={job.description}
                title={job.title}
                location={job.company.location}
                category={job.category}
                companyName={job.company.name}
                createdAt={job.createdAt}
                logoUrl={job.company.logoUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
