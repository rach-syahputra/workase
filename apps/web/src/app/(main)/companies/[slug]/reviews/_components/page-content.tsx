'use client';

import CompanyRating from './company-rating';
import CompanyReviews from './company-reviews';

interface PageContentProps {
  slug: string;
}

const PageContent = ({ slug }: PageContentProps) => {
  return (
    <section className="relative mx-auto flex w-full max-w-screen-md flex-col">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <CompanyRating slug={slug} />
        <CompanyReviews slug={slug} />
      </div>
    </section>
  );
};

export default PageContent;
