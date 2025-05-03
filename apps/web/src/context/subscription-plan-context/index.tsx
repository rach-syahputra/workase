'use client';

import { createContext, useContext, useState } from 'react';

import { IActiveSubscriptionPlan, ISubscriptionPlanContext } from './interface';

const SubscriptionPlanContext = createContext<
  ISubscriptionPlanContext | undefined
>(undefined);

const SubscriptionPlanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSubscriptionPlan, setActiveSubscriptionPlan] =
    useState<IActiveSubscriptionPlan>({
      id: 'STANDARD',
      label: 'Standard',
    });

  return (
    <SubscriptionPlanContext.Provider
      value={{
        activeSubscriptionPlan,
        setActiveSubscriptionPlan,
      }}
    >
      {children}
    </SubscriptionPlanContext.Provider>
  );
};

const useSubscriptionPlanContext = (): ISubscriptionPlanContext => {
  const context = useContext(SubscriptionPlanContext);
  if (context === undefined) {
    throw new Error(
      'useSubscriptionPlanContext must be used within a SubscriptionPlanProvider',
    );
  }
  return context;
};

export { SubscriptionPlanProvider, useSubscriptionPlanContext };
