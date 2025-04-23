import { SubscriptionIdType } from '@/lib/interfaces/subscription';
import { Dispatch, SetStateAction } from 'react';

export interface IActiveSubscriptionPlan {
  id: SubscriptionIdType;
  label: string;
}

export interface ISubscriptionPlanContext {
  activeSubscriptionPlan: IActiveSubscriptionPlan;
  setActiveSubscriptionPlan: Dispatch<SetStateAction<IActiveSubscriptionPlan>>;
}
