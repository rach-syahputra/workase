import {
  SubscriptionCategoryType,
  SubscriptionPaymentStatusType,
} from '../subscription';
import { IFilter } from './filter';

export type GetSubscriptionStatusType = SubscriptionPaymentStatusType | 'ALL';
export type GetSubscriptionCategoryType = 'STANDARD' | 'PROFESSIONAL' | 'ALL';

export interface GetSubscriptionsRequest extends IFilter {
  status?: GetSubscriptionStatusType[];
  category?: GetSubscriptionCategoryType;
}

export interface AddSubscriptionRequest {
  category: 'STANDARD' | 'PROFESSIONAL';
  paymentStatus: 'PENDING';
  totalPrice: number;
}

export interface UploadSubscriptionPaymentProofRequest {
  subscriptionId: string;
  subscriptionPaymentId: string;
  paymentProof: File | null;
}

export interface GetSubscriptionPaymentBySlugRequest {
  slug: string;
}

export interface UpdateSubscriptionPaymentRequest {
  paymentStatus: SubscriptionPaymentStatusType;
  subscriptionId: string;
  subscriptionPaymentId: string;
}
