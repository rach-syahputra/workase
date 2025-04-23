'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { USER_DASHBOARD_ITEMS } from '@/lib/constants/user';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '../ui/sidebar';
import { Separator } from '../shadcn-ui/separator';

interface UserSidebarProps {
  className?: string;
}

const UserSidebar = ({ className }: UserSidebarProps) => {
  const pathname = usePathname();

  return (
    <Sidebar theme="light" className={cn('fixed left-0 top-0', className)}>
      <SidebarGroup>
        <SidebarGroupLabel>
          <Image
            src="/workase.png"
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
        <Separator />
        <SidebarMenu>
          {USER_DASHBOARD_ITEMS.map((item, index) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem
                key={index}
                asChild
                className={cn({
                  'bg-primary-blue text-white': isActive,
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
    </Sidebar>
  );
};

export default UserSidebar;
