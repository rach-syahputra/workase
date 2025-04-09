'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { developerMenu } from '@/lib/constants/developer';
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
  const pathname = usePathname();

  return (
    <Sidebar className={cn('fixed left-0 top-0', className)}>
      <SidebarGroup>
        <SidebarGroupLabel>
          <Image
            src="/workase-white-blue.png"
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
        <SidebarMenu>
          {developerMenu.map((item, index) => {
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
    </Sidebar>
  );
};

export default DeveloperSidebar;
