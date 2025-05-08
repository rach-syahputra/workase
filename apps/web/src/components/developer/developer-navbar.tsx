'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AlignJustify, LogOut, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DEVELOPER_SIDEBAR_ITEMS } from '@/lib/constants/developer';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';
import AppLogo from '../ui/app-logo';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../shadcn-ui/dialog';
import { Separator } from '../shadcn-ui/separator';

const DeveloperNavbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [open, onOpenChange] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 flex min-h-12 w-full items-center justify-between border-b bg-white px-3 lg:hidden">
      <AppLogo className="w-[80px]" />
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerTrigger>
          <div className="flex aspect-square h-10 w-10 items-center justify-center">
            <AlignJustify />
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-screen gap-4 px-4">
          <DialogHeader className="sr-only">
            <DialogTitle className="sr-only">Developer Navigation</DialogTitle>
            <DialogDescription className="sr-only">
              Access and manage all features.
            </DialogDescription>
          </DialogHeader>

          <AppLogo />

          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <h1 className="heading-5 text-primary-gray">Management</h1>
            <ul className="mt-4 flex w-full flex-col items-center justify-center gap-2">
              {DEVELOPER_SIDEBAR_ITEMS.map((item, index) => {
                const isActive = pathname === item.url;

                return (
                  <li
                    key={index}
                    className={cn(
                      'hover:bg-primary-blue-hover h-16 w-full rounded-md font-medium transition-all duration-300 ease-in-out',
                      {
                        'bg-primary-blue text-white': isActive,
                      },
                    )}
                  >
                    <Link
                      href={item.url}
                      aria-label={item.title}
                      onClick={() => onOpenChange(false)}
                      className="flex h-full w-full items-center justify-center gap-2 text-center"
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Separator />

          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <h1 className="heading-5 text-primary-gray">Account</h1>
            <ul className="mt-4 flex w-full flex-col items-center justify-center gap-2">
              <li className="h-16 w-full rounded-md font-medium transition-all duration-300 ease-in-out">
                <button className="flex h-full w-full cursor-default items-center justify-center gap-2 text-center">
                  <User size={21} />
                  {session.data?.user?.name}
                </button>
              </li>
              <li className="h-16 w-full rounded-md font-medium transition-all duration-300 ease-in-out hover:bg-red-500">
                <button
                  onClick={() => signOut()}
                  className="flex h-full w-full items-center justify-center gap-2 text-center"
                >
                  <LogOut size={21} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default DeveloperNavbar;
