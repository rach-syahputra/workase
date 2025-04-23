export type SubscriptionIdType = 'STANDARD' | 'PROFESSIONAL';
export type SubscriptionCategoryType = 'Standard' | 'Professional';
export type SubscriptionPaymentStatusType =
  | 'PENDING'
  | 'CONFIRMED'
  | 'REJECTED';

export interface ISubscriptionCard {
  id: SubscriptionIdType;
  category: SubscriptionCategoryType;
  price: number;
  benefits: string[];
}

export interface ISubscriptionStatCard {
  amount: number;
  label: string;
}

export interface ISubscription {
  id: string;
  userId: string;
  category: string;
  startedAt: string;
  expiresAt: string | null;
  isDeleted: boolean;
}

export interface ISubscriptionPayment {
  id: string;
  subscriptionId: string;
  paymentStatus: SubscriptionPaymentStatusType;
  paymentProof: string | null;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string;
  isDeleted: boolean;
}

export interface ISubscriptionWithPayment extends ISubscription {
  payment: ISubscriptionPayment;
}
