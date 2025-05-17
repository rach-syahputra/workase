'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { NewestJobs } from './_components/newest-jobs';
import { NearestJobs } from './_components/nearest-job';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppLoading from '@/components/ui/app-loading';
import { Job, JobsResponse } from '@/context/search-job-context';
import { axiosPublic } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

function getCookie(name: string) {
  if (typeof document == 'undefined') return null;
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function deleteCookie(name: string) {
  if (typeof document == 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const urlMessage = searchParams.get('message');
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      try {
        const fiveNewestJobs = await axiosPublic.get(
          '/jobs?sort=desc&order=desc&limit=5&page=1',
        );
        const data = fiveNewestJobs.data as { data: JobsResponse };
        setJobs(data.data.jobs);
      } catch (error) {
        toast({
          title: 'Error',
          description: `Error fetching jobs, something went wrong`,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (urlMessage) {
        toast({
          title: 'Notification',
          description: urlMessage,
          variant: 'destructive',
        });
      }
      const cookieMessage = getCookie('message');
      if (cookieMessage) {
        toast({
          title: 'Notification',
          description: cookieMessage,
          variant: 'destructive',
        });
        deleteCookie('message');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [urlMessage, toast]);

  return loading ? (
    <div className="bg-background fixed left-0 top-0 flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        <NewestJobs jobs={jobs} />
        <NearestJobs />
      </div>
    </Container>
  );
}
