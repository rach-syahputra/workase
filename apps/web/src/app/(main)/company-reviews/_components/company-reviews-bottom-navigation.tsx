'use client';

import { Bookmark, MessageSquare, MessageSquarePlus } from 'lucide-react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import BottomNavigation from '@/components/layout/bottom-navigation';

const CompanyReviewsBottomNavigation = () => {
  const { userCurrentCompanies } = useCompaniesReviewsContext();

  let items = [
    {
      id: 1,
      label: 'Reviews',
      icon: <MessageSquare size={16} />,
      href: '/companies/reviews',
    },
    {
      id: 2,
      label: 'Saved',
      icon: <Bookmark size={16} />,
      href: '/companies/reviews/saved',
    },
  ];

  if (userCurrentCompanies && userCurrentCompanies.length > 0) {
    items = [
      ...items,
      {
        id: 3,
        label: 'Add Review',
        icon: <MessageSquarePlus size={16} />,
        href: '/companies/reviews/new',
      },
    ];
  }

  return <BottomNavigation items={items} />;
};

export default CompanyReviewsBottomNavigation;
