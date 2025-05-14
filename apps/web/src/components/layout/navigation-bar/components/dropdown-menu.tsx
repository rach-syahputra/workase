import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import { IoPerson } from 'react-icons/io5';
import { MdDashboard, MdLogout } from 'react-icons/md';

export default function DropdownMenuDemo() {
  const { data: session } = useSession();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-0 focus:ring-offset-0">
        <Image
          src={
            session?.user?.profilePhoto ||
            session?.user?.logoUrl ||
            '/images/noProfil.jpg'
          }
          alt="avatar"
          width={40}
          height={40}
          className="object-cover border rounded-full aspect-square"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3">
          <IoPerson />

          <Link
            href={
              session?.user?.role === 'USER'
                ? `/w/${session?.user?.slug}`
                : `/profile-management`
            }
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3">
          <MdDashboard />
          <Link href="/dashboard/applied-jobs" className="text-left">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3">
          <MdLogout />
          <button onClick={() => signOut()} className="text-left">
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
