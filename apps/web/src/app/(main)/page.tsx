'use client';
import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './_components/searchbar';
import { NewestJobs } from './_components/newest-jobs';
import { NearestJobs } from './_components/nearest-job';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppLoading from '@/components/ui/app-loading';

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
  useEffect(() => {
    if (urlMessage) {
      alert(urlMessage);
    }
    const cookieMessage = getCookie('message');
    if (cookieMessage) {
      alert(cookieMessage);
      deleteCookie('message');
    }
  }, [urlMessage]);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);
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
        <NewestJobs />
        <NearestJobs />
      </div>
    </Container>
  );
}
