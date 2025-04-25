import { SubscriptionPaymentStatusType } from '../subscription';
import { IFilter } from './filter';

export interface GetSubscriptionsRequest extends IFilter {
  status?: SubscriptionPaymentStatusType[];
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
