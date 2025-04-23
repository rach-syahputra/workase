import { PaymentStatus, SubscriptionCategory } from '@prisma/client';
import { IFilter } from './filter.interface';

export interface AddSubscriptionRequest {
  category: SubscriptionCategory;
  paymentStatus: PaymentStatus;
  userId: string;
}

export interface AddSubscriptionPaymentRequest {
  subscriptionId: string;
  paymentStatus: PaymentStatus;
}

export interface AddSubscriptionPaymenServiceRequest
  extends AddSubscriptionPaymentRequest {
  paymentProof: Express.Multer.File;
}

export interface AddSubscriptionPaymenRepositoryRequest
  extends AddSubscriptionPaymentRequest {
  paymentProof: string;
}

export interface UpdateSubscriptionPaymentRequest {
  subscriptionPaymentId: string;
  approvedBy?: string;
  paymentStatus?: PaymentStatus;
}

export interface UpdateSubscriptionPaymentServiceRequest
  extends UpdateSubscriptionPaymentRequest {
  paymentProof?: Express.Multer.File;
}

export interface UpdateSubscriptionPaymentRepositoryRequest
  extends UpdateSubscriptionPaymentRequest {
  paymentProof?: string;
}

export interface GetSubscriptionsRequest extends IFilter {
  userId: string;
}
