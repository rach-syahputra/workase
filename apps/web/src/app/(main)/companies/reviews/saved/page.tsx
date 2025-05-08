import { Metadata } from 'next';

import PageContent from './_components/page-content';

export const metadata: Metadata = {
  title: 'Saved Company Reviews — Workase',
  description:
    'Explore honest reviews and ratings from real employees about companies on Workase. Gain insights into workplace culture, work-life balance, facility and career growth before you apply.',
};

const SavedReviewsPage = () => {
  return (
    <section className="flex w-full flex-col">
      <PageContent />
    </section>
  );
};

export default SavedReviewsPage;
