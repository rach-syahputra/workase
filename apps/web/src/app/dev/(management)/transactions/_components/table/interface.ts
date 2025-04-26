import { IHandlePaymentRequest } from '@/context/developer-transaction-context/interface';
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
  };
  user: {
    email: string;
  };
  paymentProof: string | null;
  category: SubscriptionCategoryType;
  price: number;
  createdAt: string;
}

export interface GetTransactionColumnsRequest {
  onCreatedAtClick: () => void;
  handlePayment: (req: IHandlePaymentRequest) => void;
  developer: {
    email: string;
  };
}
