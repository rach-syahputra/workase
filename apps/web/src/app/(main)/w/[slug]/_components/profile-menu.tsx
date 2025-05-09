'use client';

import Link from 'next/link';
import { File, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { Button } from '@/components/shadcn-ui/button';
import { useUserDetailContext } from '@/context/user-detail-context';
import Image from 'next/image';
import AppLoading from '@/components/ui/app-loading';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

interface ProfileMenuProps {
  className?: string;
}

const ProfileMenu = ({ className }: ProfileMenuProps) => {
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
      icon: <User size={16} />,
      href: `/w/${user?.slug}`,
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
            className="aspect-square w-20 rounded-full bg-gray-200"
          />
        ) : (
          <div className="aspect-square w-20 rounded-full bg-gray-200"></div>
        )}
        {isLoading ? (
          <div className="w-full px-8">
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          <p>asputra.as18@gmail.com</p>
        )}
      </div>
      <Separator />
      <div className="flex w-full flex-col items-start">
        {PROFILE_MENU_ITEMS.map((item, index) => (
          <Button
            key={index}
            asChild
            variant="ghost"
            onClick={() => setActiveProfileMenuItemId(item.id)}
            className={cn('flex h-11 w-full items-center justify-start', {
              'text-primary-blue': activeProfileMenuItemId === item.id,
            })}
          >
            <Link href={item.href}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default ProfileMenu;
