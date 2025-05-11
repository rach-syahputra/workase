'use client';

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bookmark,
  BriefcaseBusiness,
  DollarSign,
  LucideProps,
  NotepadText,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useUserStatsContext } from '@/context/user-stats-context';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from '../ui/sidebar';
import { Separator } from '../shadcn-ui/separator';
import { Skeleton } from '../shadcn-ui/skeleton';

interface UserSidebarProps {
  className?: string;
}

interface IUserDashboardItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

const UserSidebar = ({ className }: UserSidebarProps) => {
  const pathname = usePathname();
  const { userStats } = useUserStatsContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDashboardItems, setUserDashboardItems] = useState<
    IUserDashboardItem[]
  >([]);

  const getUserDashboardItems = useCallback(() => {
    setIsLoading(true);

    let USER_DASHBOARD_ITEMS = [
      {
        title: 'Applied Jobs',
        url: '/dashboard/applied-jobs',
        icon: BriefcaseBusiness,
      },
    ];

    if (
      userStats?.subscription.plan === 'STANDARD' ||
      userStats?.subscription.plan === 'PROFESSIONAL'
    ) {
      USER_DASHBOARD_ITEMS = [
        ...USER_DASHBOARD_ITEMS,
        {
          title: 'Assessment',
          url: '/dashboard/assessments',
          icon: NotepadText,
        },
        {
          title: 'Saved Jobs',
          url: '/dashboard/saved-jobs',
          icon: Bookmark,
        },
      ];
    }

    setUserDashboardItems(USER_DASHBOARD_ITEMS);
    setIsLoading(false);
  }, [userStats]);

  useEffect(() => {
    getUserDashboardItems();
  }, [getUserDashboardItems]);

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
          {isLoading ? (
            <>
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </>
          ) : (
            <>
              {userDashboardItems?.map((item, index) => {
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
              <SidebarMenuItem
                key="subscriptions"
                asChild
                className={cn({
                  'bg-primary-blue text-white':
                    pathname === '/dashboard/subscription',
                })}
              >
                <SidebarMenuLink
                  href="/dashboard/subscription"
                  label="Subscription"
                  lucideIcon={DollarSign}
                />
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarGroup>
    </Sidebar>
  );
};

export default UserSidebar;
