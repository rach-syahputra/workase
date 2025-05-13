import { OrderType } from './api-request/filter';
import { GetSubscriptionStatusType } from './api-request/subscription';

export type SubscriptionIdType = 'STANDARD' | 'PROFESSIONAL';
export type SubscriptionCategoryType = 'Standard' | 'Professional';
export type SubscriptionPaymentStatusType =
  | 'PENDING'
  | 'CONFIRMED'
  | 'REJECTED';
export type SubscriptionStatusType = 'expired' | 'active' | 'upcoming';

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
  user?: {
    email: string;
  };
  subscriptionStatus: SubscriptionStatusType;
}

export interface ISubscriptionPayment {
  id: string;
  category: SubscriptionIdType;
  subscriptionId: string;
  totalPrice: number;
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

export interface IFetchGetSubscriptionsRequest {
  page: number;
  limit: number;
  order: OrderType;
  status: GetSubscriptionStatusType[];
}
