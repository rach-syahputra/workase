import React from 'react';

import { getCurrentCompanies } from '@/lib/apis/user-stats';
import { CompaniesReviewsProvider } from '@/context/companies-reviews-context';
import { SavedReviewsProvider } from '@/context/saved-reviews-context';
import { Card } from '@/components/shadcn-ui/card';
import SavedReviewsSection from './_components/saved-reviews-section';
import AddReviewSection from './_components/add-review-section';

interface CompaniesReviewsLayoutProps {
  children: React.ReactNode;
}

const CompaniesReviewsLayout = async ({
  children,
}: CompaniesReviewsLayoutProps) => {
  const response = await getCurrentCompanies();
  const userCurrentCompanies = response?.data?.currentCompanies;

  return (
    <CompaniesReviewsProvider userCurrentCompanies={userCurrentCompanies || []}>
      <SavedReviewsProvider>
        <div className="relative mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 py-4 lg:grid lg:grid-cols-9 lg:gap-6 lg:px-8">
          <SavedReviewsSection className="h-fit w-full max-lg:hidden lg:sticky lg:top-[84px] lg:col-span-2" />
          <Card className="mx-auto w-full max-w-screen-md lg:col-span-5 lg:min-h-[calc(100svh-96px)]">
            {children}
          </Card>
          <AddReviewSection className="h-fit w-full max-lg:hidden lg:sticky lg:top-[84px] lg:col-span-2" />
        </div>
      </SavedReviewsProvider>
    </CompaniesReviewsProvider>
  );
};

export default CompaniesReviewsLayout;
