import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import {
  Card,
  CardBadge,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import Icon from '@/components/ui/icon';

const CardExample = () => {
  return (
    <div className="shadow-lg">
      <Card className="">
        <CardHeader className="gap-1.5">
          <div className="flex items-center justify-between">
            <CardTitle>Programming Lecturer</CardTitle>
            <span>Rp 4-6M</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <CardBadge>Remote</CardBadge>
            <CardBadge>1-3 years of experience</CardBadge>
            <CardBadge>Minimum Bachelor’s Degree</CardBadge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-fit items-center justify-center gap-2.5">
            <Image
              src="/purwadhika.jpeg"
              alt="Company logo"
              width={100}
              height={100}
              className="w-8 rounded-full aspect-square"
            />
            <div className="flex flex-col">
              <Link
                href="#"
                aria-label="Company detail"
                className="text-sm text-primary-blue"
              >
                Purwadhika Digital Technology School
              </Link>
              <p className="text-sm">Tangerang, Banten</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Separator />
          <div className="flex items-center justify-between w-full gap-4">
            <span className="text-sm text-primary-gray">2 days ago</span>
            <Icon
              icon={faBookmark}
              className="w-4 h-4 cursor-pointer text-primary-dark"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardExample;
