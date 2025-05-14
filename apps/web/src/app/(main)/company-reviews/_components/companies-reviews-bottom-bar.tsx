'use client';

import { useSession } from 'next-auth/react';
import { Bookmark, MessageCircle, MessageCirclePlus } from 'lucide-react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import BottomNavigation from '@/components/layout/bottom-navigation';

const CompaniesReviewsBottomBar = () => {
  const { data: session } = useSession();
  const { userCurrentCompanies } = useCompaniesReviewsContext();

  const items = [
    {
      id: 2,
      label: 'Reviews',
      icon: (
        <>
          <MessageCircle size={16} />
        </>
      ),
      href: '/company-reviews',
    },
  ];

  // Add saved reviews navigation for authenticated users
  if (session?.user?.accessToken) {
    items.splice(0, 0, {
      id: 1,
      label: 'Saved',
      icon: (
        <>
          <Bookmark size={16} />
        </>
      ),
      href: '/company-reviews/saved',
    });
  }

  // Add add review navigation for employeed users
  if (
    session?.user?.jobId &&
    userCurrentCompanies &&
    userCurrentCompanies.length > 0
  ) {
    items.splice(2, 0, {
      id: 3,
      label: 'Add',
      icon: (
        <>
          <MessageCirclePlus size={16} />
        </>
      ),
      href: '/company-reviews/new',
    });
  }

  return <BottomNavigation items={items} />;
};

export default CompaniesReviewsBottomBar;
