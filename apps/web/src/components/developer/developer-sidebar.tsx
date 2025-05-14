'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DEVELOPER_SIDEBAR_ITEMS } from '@/lib/constants/developer';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '../ui/sidebar';
import { Separator } from '../shadcn-ui/separator';

interface DeveloperSidebarProps {
  className?: string;
}

const DeveloperSidebar = ({ className }: DeveloperSidebarProps) => {
  const session = useSession();
  const pathname = usePathname();

  return (
    <Sidebar className={cn('fixed left-0 top-0', className)}>
      <SidebarGroup className="gap-2">
        <SidebarGroupLabel>
          <Image
            src="/workase-white-for-developer.png"
            alt="Workase"
            width={921}
            height={189}
            className="hidden w-28 lg:block"
          />
          <Image
            src="/workase-sm.png"
            alt="Workase"
            width={100}
            height={67.24}
            className="w-4 lg:hidden"
          />
        </SidebarGroupLabel>
        <Separator className="bg-primary-gray" />
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarMenu>
          {DEVELOPER_SIDEBAR_ITEMS.map((item, index) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem
                key={index}
                asChild
                className={cn({
                  'bg-primary-blue': isActive,
                })}
              >
                <SidebarMenuLink
                  href={item.url}
                  label={item.title}
                  lucideIcon={item.icon}
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="mt-8 gap-2">
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem className="hover:bg-primary-dark-background cursor-default">
            <User size={16} />
            <p className="line-clamp-1">{session.data?.user?.name}</p>
          </SidebarMenuItem>
          <SidebarMenuItem asChild className="hover:bg-red-500">
            <button onClick={() => signOut()}>
              <LogOut size={16} />
              Logout
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </Sidebar>
  );
};

export default DeveloperSidebar;
