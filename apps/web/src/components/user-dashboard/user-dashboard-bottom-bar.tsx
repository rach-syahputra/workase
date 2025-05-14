'use client';

import {
  Bookmark,
  BriefcaseBusiness,
  DollarSign,
  NotepadText,
} from 'lucide-react';

import BottomNavigation from '../layout/bottom-navigation';
import { useUserStatsContext } from '@/context/user-stats-context';

const UserDashboardBottomBar = () => {
  const { userStats } = useUserStatsContext();

  const items = [
    {
      id: 1,
      label: 'Applied Jobs',
      icon: <BriefcaseBusiness size={16} />,
      href: '/dashboard/applied-jobs',
    },
    {
      id: 2,
      label: 'Saved Jobs',
      icon: <Bookmark size={16} />,
      href: '/dashboard/saved-jobs',
    },
    {
      id: 4,
      label: 'Subscription',
      icon: <DollarSign size={16} />,
      href: '/dashboard/subscription',
    },
  ];

  // Add assessment navigation for subscribers
  if (
    userStats?.subscription.plan === 'STANDARD' ||
    userStats?.subscription.plan === 'PROFESSIONAL'
  ) {
    items.splice(2, 0, {
      id: 3,
      label: 'Assessment',
      icon: <NotepadText size={16} />,
      href: '/dashboard/assessments',
    });
  }

  return <BottomNavigation items={items} />;
};

export default UserDashboardBottomBar;
