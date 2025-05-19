'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { NewestJobs } from './_components/newest-jobs';
import { NearestJobs } from './_components/nearest-job';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppLoading from '@/components/ui/app-loading';
import { Job, JobsResponse, useSearchJob } from '@/context/search-job-context';
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
  const { fetchJobs } = useSearchJob();
  const searchParams = useSearchParams();
  const urlMessage = searchParams.get('message');
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();
  const [isFetch, setIsFetch] = useState(false);
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
    const dateFilterParam = searchParams.get('dateFilter');
    const sortOrderParam =
      (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
    const dateFromParams = searchParams.get('startDate');
    const dateToParams = searchParams.get('endDate');
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setIsFetch(true);
        fetchJobs({
          title: '',
          category: '',
          location: position.coords.latitude + ',' + position.coords.longitude,
          dateFilter: dateFilterParam as any,
          startDate: dateFromParams ? new Date(dateFromParams) : null,
          endDate: dateToParams ? new Date(dateToParams) : null,
          sortOrder: sortOrderParam,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive',
        });
      } finally {
        setIsFetch(false);
      }
    });
  }, [fetchJobs, searchParams, toast]);

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
    <div className="fixed top-0 left-0 flex items-center justify-center flex-1 w-screen min-h-screen bg-background">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <Container className="">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="font-geist mb-[5px] flex h-fit w-full flex-col items-center justify-center">
          <SearchBar isFetch={isFetch} />
        </div>
        <NewestJobs jobs={jobs} />
        <NearestJobs />
      </div>
    </Container>
  );
}
