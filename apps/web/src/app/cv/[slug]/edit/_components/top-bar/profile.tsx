'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Home, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';

interface ProfileProps {
  className?: string;
}

const Profile = ({ className }: ProfileProps) => {
  const { data: session } = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={className}>
        {session?.user?.profilePhoto ? (
          <Image
            src={session.user.profilePhoto}
            alt="Profile photo"
            width={100}
            height={100}
            className="aspect-square w-10 rounded-full bg-gray-300 object-cover"
          />
        ) : (
          <div className="aspect-square w-10 rounded-full bg-gray-300"></div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/w/${session?.user?.slug}`}>
            <User size={16} />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/">
            <Home size={16} />
            Home
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
