import React from 'react';
import { Metadata } from 'next';
import { auth } from '@/auth';

import { getCurrentCompanies } from '@/lib/apis/user-stats';
import { CompaniesReviewsProvider } from '@/context/companies-reviews-context';
import { SavedReviewsProvider } from '@/context/saved-reviews-context';
import { Card } from '@/components/shadcn-ui/card';
import SavedReviewsSection from './_components/saved-reviews-section';
import AddReviewSection from './_components/add-review-section';

interface CompaniesReviewsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Company Reviews — Workase',
  description:
    'Explore honest reviews and ratings from real employees about companies on Workase. Gain insights into workplace culture, work-life balance, facility and career growth before you apply.',
};

const CompaniesReviewsLayout = async ({
  children,
}: CompaniesReviewsLayoutProps) => {
  const session = await auth();
  const token = session?.user?.accessToken;
  const response = await getCurrentCompanies({ token: token || '' });
  const userCurrentCompanies = response?.data?.currentCompanies;

  return (
    <CompaniesReviewsProvider userCurrentCompanies={userCurrentCompanies || []}>
      <SavedReviewsProvider>
        <div className="relative mx-auto flex w-full max-w-screen-xl flex-col gap-4 py-4 md:px-4 lg:grid lg:grid-cols-9 lg:gap-6 lg:px-8">
          <SavedReviewsSection className="h-fit w-full max-lg:hidden lg:sticky lg:top-[84px] lg:col-span-2" />
          <Card className="mx-auto min-h-[calc(100svh-96px)] w-full max-w-screen-md max-md:border-none max-md:shadow-none lg:col-span-5">
            {children}
          </Card>
          <AddReviewSection className="h-fit w-full max-lg:hidden lg:sticky lg:top-[84px] lg:col-span-2" />
        </div>
      </SavedReviewsProvider>
    </CompaniesReviewsProvider>
  );
};

export default CompaniesReviewsLayout;
