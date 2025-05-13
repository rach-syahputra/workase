import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useToast } from '@/hooks/use-toast';
import { DialogApplyJob } from './dialog-apply-job';
import { useSession } from 'next-auth/react';
import { axiosPrivate } from '@/lib/axios';

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  category: string;
  companyName: string;
  description: string;
  createdAt?: string;
  logoUrl?: string;
  slug: string;
}

const JobCard = ({
  id,
  title,
  location,
  category,
  companyName,
  description,
  createdAt,
  logoUrl,
  slug,
}: JobCardProps) => {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const handleSave = async (e: React.MouseEvent) => {
    // limit area from the event
    e.preventDefault();
    e.stopPropagation();
    if (
      session?.user?.accessToken === undefined ||
      session.user.role !== 'USER'
    ) {
      toast({
        title:
          session?.user?.role !== 'USER'
            ? 'Login as User Required'
            : 'Login Required',
        description:
          session?.user?.role !== 'USER'
            ? 'You need to login as user before saving a job'
            : 'You need to login before saving a job',
        variant: 'destructive',
      });
      return;
    }
    try {
      const newState = !saved;
      setSaved(newState);
      if (newState) {
        const axiosInstance = axiosPrivate(
          session?.user?.accessToken as string,
          'application/json',
        );
        await axiosInstance.post(`/saved-jobs`, {
          jobId: id,
        });
        toast({ description: 'Job saved!' });
      } else {
        const axiosInstance = axiosPrivate(
          session?.user?.accessToken as string,
          'application/json',
        );

        await axiosInstance.delete(`/saved-jobs/${id}`);
        toast({ description: 'Job removed from saved' });
      }
      toast({
        description: newState ? 'Job saved!' : 'Job removed from saved',
      });
    } catch (error) {
      console.error(error);
      toast({
        description: 'An error occurred while saving or removing the job.',
      });
    }
  };

  const formatCategory = (text: string) =>
    text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  return (
    <div className="relative group">
      <div className="absolute z-10 right-4 top-2">
        <DialogApplyJob
          jobId={id}
          className="hover:text-primary-blue font-geist text-primary-blue z-10 border-none p-[5px] text-sm font-semibold opacity-90 shadow-white transition hover:bg-white hover:shadow-white group-hover:opacity-100"
          variant="outline"
        />
      </div>
      <Link
        href={`/jobs/${slug}`}
        className="border-primary-background-gray block rounded-md border shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border hover:border-blue-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:border-0"
      >
        <Card className="relative group">
          <CardHeader className="w-[100%] min-w-[500px] gap-1.5">
            <div className="flex items-center justify-between">
              <CardTitle className="font-bold">{title}</CardTitle>
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
                className="w-8 rounded-full aspect-square"
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
            <div className="flex items-center justify-between w-full gap-4 font-medium font-geist">
              <div className="flex items-center gap-1">
                <WiTime2 className="text-primary-gray" />
                <span className="text-[14px] font-thin">Posted at</span>
                <span className="text-sm text-primary-gray">
                  {formatRelativeTime(createdAt || '')}
                </span>
              </div>
              <button
                onClick={handleSave}
                className="p-0 bg-transparent border-none cursor-pointer"
              >
                <Icon
                  icon={saved ? solidBookmark : regularBookmark}
                  className={cn(
                    `hover:fill h-7 w-7 cursor-pointer p-[6px] transition ${saved ? 'text-primary-blue' : 'text-primary-dark'}`,
                  )}
                />
              </button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default JobCard;
