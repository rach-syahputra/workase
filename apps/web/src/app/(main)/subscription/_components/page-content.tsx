'use client';

import Container from '@/components/layout/container';
import SubscriptionHero from './hero/subscription-hero';
import SubscriptionStats from './stats/subscription-stats';
import TopAssessments from './top-assessments/top-assessments';

const PageContent = () => {
  return (
    <Container className="flex min-h-[calc(100svh-68px)] flex-col items-center justify-center gap-16">
      <SubscriptionHero />
      <SubscriptionStats />
      {/* <TopAssessments /> */}
    </Container>
  );
};

export default PageContent;
