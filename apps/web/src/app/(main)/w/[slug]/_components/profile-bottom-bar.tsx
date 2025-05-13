import { Building, User } from 'lucide-react';

import BottomNavigation from '@/components/layout/bottom-navigation';

interface ProfileBottomBarProps {
  slug: string;
}

const ProfileBottomBar = ({ slug }: ProfileBottomBarProps) => {
  const items = [
    {
      id: 1,
      label: 'Profile',
      icon: <User size={16} />,
      href: `/w/${slug}`,
    },
    {
      id: 1,
      label: 'Company',
      icon: <Building size={16} />,
      href: `/w/${slug}?tab=company`,
    },
  ];

  return <BottomNavigation items={items} />;
};

export default ProfileBottomBar;
