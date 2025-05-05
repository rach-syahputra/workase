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
        <div className="relative mx-auto grid w-full max-w-screen-xl grid-cols-9 gap-6 px-8 py-4">
          <SavedReviewsSection />
          <Card className="col-span-5 min-h-[calc(100svh-96px)]">
            {children}
          </Card>
          <AddReviewSection className="sticky top-[84px] col-span-2 h-fit w-full" />
        </div>
      </SavedReviewsProvider>
    </CompaniesReviewsProvider>
  );
};

export default CompaniesReviewsLayout;
