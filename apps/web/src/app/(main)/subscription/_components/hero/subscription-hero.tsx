'use client';

import { SUBSCRIPTION_CARDS } from '@/lib/constants/subscription';
import { useSubscriptionPlanContext } from '@/context/subscription-plan-context';
import TopLine from './top-line';
import BottomLine from './bottom-line';
import SubscriptionCard from './subscription-card';
import SubscriptionHeroHeader from './subscription-hero-header';

const SubscriptionHero = () => {
  const { activeSubscriptionPlan, setActiveSubscriptionPlan } =
    useSubscriptionPlanContext();

  return (
    <div className="mx-auto grid max-w-[800px] md:grid-cols-2 md:px-4 md:py-10">
      <SubscriptionHeroHeader className="md:col-span-1" />
      <div className="mt-8 flex w-full items-center md:col-span-1 md:mt-[28px]">
        <div className="flex flex-col gap-4">
          <TopLine
            isActive={activeSubscriptionPlan.id === 'STANDARD'}
            className="max-md:hidden"
          />
          <BottomLine
            isActive={activeSubscriptionPlan.id === 'PROFESSIONAL'}
            className="max-md:hidden"
          />
        </div>
        <div className="flex w-full flex-col gap-4 md:gap-8">
          {SUBSCRIPTION_CARDS.map((subscription, index) => {
            const isActive = activeSubscriptionPlan.id === subscription.id;

            return (
              <SubscriptionCard
                key={index}
                subscription={subscription}
                onClick={() =>
                  setActiveSubscriptionPlan({
                    id: subscription.id,
                    label: subscription.category,
                  })
                }
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHero;
