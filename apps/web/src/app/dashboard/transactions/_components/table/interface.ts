import {
  SubscriptionCategoryType,
  SubscriptionPaymentStatusType,
} from '@/lib/interfaces/subscription';

export interface ICompletedTransactionColumn {
  id: string;
  payment: {
    id: string;
    status: SubscriptionPaymentStatusType;
    slug: string;
  };
  paymentProof: string | null;
  category: SubscriptionCategoryType;
  price: number;
  createdAt: string;
}

export interface GetCompletedTransactionColumnsRequest {
  onCreatedAtClick: () => void;
}
