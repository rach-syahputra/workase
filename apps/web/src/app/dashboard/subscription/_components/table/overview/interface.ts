import {
  SubscriptionCategoryType,
  SubscriptionStatusType,
} from '@/lib/interfaces/subscription';

export interface IOverviewColumn {
  id: string;
  category: SubscriptionCategoryType;
  startedAt: string;
  expiresAt: string | null;
  subscriptionStatus: SubscriptionStatusType;
}

export interface GetOverviewColumnsRequest {
  onCreatedAtClick: () => void;
}
