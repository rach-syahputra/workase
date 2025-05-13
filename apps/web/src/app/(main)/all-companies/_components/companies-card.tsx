'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardBadge,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { MdOutlineWork } from 'react-icons/md';

interface CompaniesCardProps {
  _count: number;
  location: string;
  category: string;
  name: string;
  logoUrl?: string;
  slug: string;
}

export default function CompaniesCard({
  _count,
  location,
  category,
  name,
  logoUrl,
  slug,
}: CompaniesCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="group relative">
      <Link
        href={`/companies/${slug}`}
        className="border-primary-background-gray block rounded-md border shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border hover:border-blue-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:border-0"
      >
        <Card className="group relative">
          <CardHeader className="w-full max-w-full gap-1.5">
            <div className="flex w-fit items-center justify-center gap-2.5 pl-2">
              {logoUrl ? (
                <Image
                  src={logoUrl || '/company-logo.png'}
                  alt="Company logo"
                  width={100}
                  height={100}
                  className="aspect-square h-[70px] w-[70px] rounded-full border object-cover"
                />
              ) : (
                <div className="flex aspect-square h-[70px] w-[70px] items-center justify-center rounded-full border bg-gray-200">
                  <span className="text-gray-400"></span>
                </div>
              )}
              <div className="flex flex-col gap-1 font-medium">
                <Link
                  href="#"
                  aria-label="Company detail"
                  className="max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap py-[2px] text-[17px] font-semibold text-black sm:max-w-[210px] md:max-w-[200px]"
                >
                  {name}
                </Link>
                <p className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light">
                  {location}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap font-medium">
              <CardBadge className="bg-primary-gray-background h-[28px] min-w-[71px]">
                {category}
              </CardBadge>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator />
            <div className="font-geist flex w-full items-center justify-between gap-4 font-medium">
              <div className="flex items-center gap-1">
                <span className="text-primary-blue text-[14px] font-thin">
                  {_count} job openings
                </span>
              </div>
              <div>
                <MdOutlineWork
                  className={cn(
                    `hover:fill text-primary-dark-blue h-7 w-7 cursor-pointer p-[6px] transition`,
                  )}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
