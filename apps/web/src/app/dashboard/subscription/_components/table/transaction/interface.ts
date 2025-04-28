import {
  SubscriptionCategoryType,
  SubscriptionPaymentStatusType,
} from '@/lib/interfaces/subscription';

export interface ITransactionColumn {
  id: string;
  payment: {
    id: string;
    status: SubscriptionPaymentStatusType;
    slug: string;
    createdAt: string;
  };
  paymentProof: string | null;
  category: SubscriptionCategoryType;
  price: number;
}

export interface GetTransactionColumnsRequest {
  onCreatedAtClick: () => void;
}
