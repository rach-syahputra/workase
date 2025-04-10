import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { WiTime2 } from 'react-icons/wi';
import { useState } from 'react';
import { cn, formatRelativeTime } from '@/lib/utils'; // Ensure the correct path to your utility function
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
// Ensure the correct path to the toast module
// Ensure the correct path to the toast module
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  title: string;
  location: string;
  category: string;
  companyName: string;
  description: string;
  createdAt?: string;
  logoUrl?: string;
}

const JobCard = ({
  title,
  location,
  category,
  companyName,
  description,
  createdAt,
  logoUrl,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const handleSave = () => {
    const newState = !saved;
    setSaved(newState);
    toast({ description: newState ? 'Job saved!' : 'Job removed from saved' });
  };
  const formatCategory = (text: string) =>
    text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  return (
    <div className="border-primary-background-gray rounded-md border shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border hover:border-blue-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:border-0">
      <Card className="group relative">
        <CardHeader className="w-[100%] min-w-[500px] gap-1.5">
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold">{title}</CardTitle>

            <button className="font-geist text-primary-blue absolute right-3 top-[9px] p-[5px] text-sm font-semibold opacity-80 transition group-hover:opacity-100">
              Apply Job
            </button>
          </div>
          <div className="flex flex-wrap gap-2 font-medium">
            <CardBadge className="bg-primary-gray-background">
              {formatCategory(category)}
            </CardBadge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-fit items-center justify-center gap-2.5">
            <Image
              src={`${logoUrl || 'default-logo.png'}`}
              alt="Company logo"
              width={100}
              height={100}
              className="aspect-square w-8 rounded-full"
            />
            <div className="flex flex-col font-medium">
              <Link
                href="#"
                aria-label="Company detail"
                className="text-primary-blue py-[2px] text-sm"
              >
                {companyName}
              </Link>
              <p className="text-sm">{location}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-3 pb-5">
          <Separator />
          <div className="font-geist flex w-full items-center justify-between gap-4 font-medium">
            <div className="flex items-center gap-1">
              <WiTime2 className="text-primary-gray" />
              <span className="text-[14px] font-thin">Posted at</span>
              <span className="text-primary-gray text-sm">
                {formatRelativeTime(createdAt || '')}
              </span>
            </div>

            <Icon
              icon={saved ? solidBookmark : regularBookmark}
              className={cn(
                `hover:fill h-7 w-7 cursor-pointer p-[6px] transition ${saved ? 'text-primary-blue' : 'text-primary-dark'}`,
              )}
              onClick={handleSave}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobCard;
