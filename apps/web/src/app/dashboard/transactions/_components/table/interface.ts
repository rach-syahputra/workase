import { SubscriptionCategoryType } from '@/lib/interfaces/subscription';

export interface IPendingTransactionColumn {
  id: string;
  payment: {
    id: string;
    status: 'PENDING';
    slug: string;
  };
  paymentProof: string | null;
  category: SubscriptionCategoryType;
  price: number;
  createdAt: string;
}

export interface GetPendingTransactionColumnsRequest {
  onCreatedAtClick: () => void;
}
