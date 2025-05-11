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
import { IoPerson } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';

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
          className="aspect-square rounded-full border object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3">
          <IoPerson />
<<<<<<< HEAD
          <Link href={`/w/${session?.user?.slug}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3">
          <MdDashboard />
          <Link href="/dashboard/subscription" className="text-left">
            Dashboard
          </Link>
=======
          <Link href={`/profile-management`}>Profile Management</Link>
>>>>>>> 178cd18 (feat: complete all core features for initial release)
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3">
          <IoPerson />
          <button onClick={() => signOut()} className="text-left">
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
