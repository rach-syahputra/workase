import { SubscriptionCategoryType } from '@/lib/interfaces/subscription';

export interface IOverviewColumn {
  id: string;
  category: SubscriptionCategoryType;
  startedAt: string;
  expiresAt: string | null;
}

export interface GetOverviewColumnsRequest {
  onCreatedAtClick: () => void;
}
