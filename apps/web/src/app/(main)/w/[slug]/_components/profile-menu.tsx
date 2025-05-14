'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Building, User } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useUserDetailContext } from '@/context/user-detail-context';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { Button } from '@/components/shadcn-ui/button';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

interface ProfileMenuProps {
  className?: string;
}

const ProfileMenu = ({ className }: ProfileMenuProps) => {
  const searchParams = useSearchParams();
  const {
    isLoading,
    activeProfileMenuItemId,
    setActiveProfileMenuItemId,
    user,
  } = useUserDetailContext();

  const PROFILE_MENU_ITEMS = [
    {
      id: 1,
      label: 'Profile',
      tab: 'profile',
      icon: <User size={16} />,
      href: `/w/${user?.slug}`,
    },
    {
      id: 2,
      label: 'Company',
      tab: 'company',
      icon: <Building size={16} />,
      href: `/w/${user?.slug}?tab=company`,
    },
  ];

  return (
    <Card
      className={cn('sticky top-[84px] flex flex-col items-center', className)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 p-5">
        {isLoading ? (
          <Skeleton className="aspect-square w-20 rounded-full" />
        ) : user?.profilePhoto ? (
          <Image
            src={user.profilePhoto}
            alt="Profile Photo"
            width={200}
            height={200}
            className="aspect-square w-20 rounded-full bg-gray-200 object-cover"
          />
        ) : (
          <div className="aspect-square w-20 rounded-full bg-gray-200"></div>
        )}
        {isLoading ? (
          <div className="w-full px-8">
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          <p>{user?.email}</p>
        )}
      </div>
      <Separator />
      <div className="flex w-full flex-col items-start">
        {PROFILE_MENU_ITEMS.map((item, index) => {
          const tab = searchParams.get('tab');

          if (tab === 'company') {
            setActiveProfileMenuItemId(2);
          } else {
            setActiveProfileMenuItemId(1);
          }

          return (
            <Button
              key={index}
              asChild
              variant="ghost"
              className={cn('flex h-11 w-full items-center justify-start', {
                'text-primary-blue': item.id == activeProfileMenuItemId,
              })}
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default ProfileMenu;
