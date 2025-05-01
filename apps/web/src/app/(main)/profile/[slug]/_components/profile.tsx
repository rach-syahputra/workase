'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Minus, Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useUserDetailContext } from '@/context/user-detail-context';
import { Button } from '@/components/shadcn-ui/button';

interface ProfileItemProps {
  title: string;
  value: string;
}

const Profile = () => {
  const { data: session } = useSession();
  const { setActiveProfileMenuItemId, user } = useUserDetailContext();
  const isOwner = session?.user?.slug === user?.slug;

  const formatDate = (date: Date) => {
    return format(date, 'MM/dd/yyyy');
  };

  useEffect(() => {
    setActiveProfileMenuItemId(1);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <div className="flex h-9 items-start justify-between gap-4">
        <h1 className="heading-3">Profile</h1>
        {isOwner && (
          <Button asChild variant="ghost">
            <Link
              href="/profile-management"
              aria-label="Profile management page"
            >
              <Pencil size={16} />
              Edit Profile
            </Link>
          </Button>
        )}
      </div>
      <div className="flex flex-col items-start justify-start gap-8 lg:flex-row lg:justify-between">
        {user?.profilePhoto ? (
          <Image
            src={user.profilePhoto}
            alt="Profile Photo"
            width={200}
            height={200}
            className="aspect-square w-28 rounded-full bg-gray-200"
          />
        ) : (
          <div className="aspect-square w-28 rounded-full bg-gray-200"></div>
        )}
        <div className="flex w-full flex-col justify-start gap-4 md:grid md:grid-cols-2">
          <ProfileItem title="Email" value={user?.email || ''} />
          <ProfileItem title="Gender" value={user?.gender || ''} />
          <ProfileItem
            title="Place of Birth"
            value={user?.placeOfBirth || ''}
          />
          <ProfileItem
            title="Date of Birth"
            value={
              user?.dateOfBirth ? formatDate(new Date(user.dateOfBirth)) : ''
            }
          />
          <ProfileItem title="Address" value={user?.address || ''} />
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ title, value }: ProfileItemProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-primary-gray text-sm">{title}</span>
      <p>{value ? value : <Minus size={16} />}</p>
    </div>
  );
};

export default Profile;
