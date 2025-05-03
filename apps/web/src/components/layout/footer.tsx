'use client';
import * as React from 'react';
import { TiSocialLinkedin } from 'react-icons/ti';
import { SlSocialInstagram } from 'react-icons/sl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export default function Footer() {
  const router = useRouter();
  return (
    <div className="bg-primary-gray-background font-geist bottom-1 z-50 w-full border-t-[0.5px] border-t-gray-200 text-[14px] md:bottom-0 md:left-0 md:right-0 md:top-[calc(100vh-64px)] md:py-6">
      <div className="w-full justify-around md:flex">
        <div className="hidden justify-center md:flex md:w-[45%] lg:w-[29%]">
          <div className="flex flex-col">
            <div className="ml-[-2px] flex h-[33px] w-fit items-center justify-center border-gray-200">
              <Image
                src="/workase.png"
                alt="Logo"
                width={600}
                height={122.61}
                className="w-[110px]"
              />
            </div>
            <div className="font-medium underline md:text-[15.5px]">
              <>Where Top Talent Meets Top Companies</>
            </div>
            <div className="mt-[20px]">
              {' '}
              &copy; 2025 Workase. All Rights Reserved.
            </div>
          </div>
        </div>
        <div className="hidden w-[25%] md:flex">
          <div className="flex flex-col justify-start gap-1 text-left">
            <div className="mb-2 font-semibold underline">Navigation</div>
            <button
              className="mr-auto font-medium hover:underline"
              onClick={() => router.push('/')}
            >
              Home
            </button>
            <button
              className="mr-auto font-medium hover:underline"
              onClick={() => router.push('/all-jobs')}
            >
              Jobs
            </button>
            <button className="mr-auto font-medium hover:underline">
              Companies
            </button>
          </div>
        </div>
        <div className="mb-[-10px] flex justify-center pt-3 md:mb-0 md:w-[15%] md:pt-0 lg:w-[9%]">
          <div className="flex w-[90%] justify-around gap-2 md:flex-col md:items-stretch md:justify-stretch md:gap-0">
            <div className="flex items-center gap-[18px] md:block md:flex-col md:items-stretch">
              <div className="font-semibold underline md:mb-[8px] md:mt-0">
                Follow Us
              </div>
              <div className="md:hidden">:</div>
              <div className="flex gap-4 md:ml-[-4px] md:flex">
                <button>
                  <TiSocialLinkedin className="h-10 w-10 scale-150 p-3 md:h-5 md:w-5 md:p-1" />
                </button>
                <span className="h-10 w-[1px] bg-gray-300 md:h-5"></span>
                <button>
                  <SlSocialInstagram className="h-9 w-9 scale-95 p-2 md:h-5 md:w-5 md:scale-110 md:p-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className="flex h-14 w-full items-center justify-center text-[14px] md:hidden">
        &copy; 2025 Workase. All rights reserved.
      </div>
    </div>
  );
}
