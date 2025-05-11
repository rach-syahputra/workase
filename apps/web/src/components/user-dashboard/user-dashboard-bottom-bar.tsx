'use client';

import { BriefcaseBusiness, DollarSign, NotepadText } from 'lucide-react';

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
      id: 3,
      label: 'Subscriptions',
      icon: <DollarSign size={16} />,
      href: '/dashboard/subscription',
    },
  ];

  // Add assessment navigation for subscribers
  if (
    userStats?.subscription.plan === 'STANDARD' ||
    userStats?.subscription.plan === 'PROFESSIONAL'
  ) {
    items.splice(1, 0, {
      id: 2,
      label: 'Assessment',
      icon: <NotepadText size={16} />,
      href: '/dashboard/assessments',
    });
  }

  return <BottomNavigation items={items} />;
};

export default UserDashboardBottomBar;
