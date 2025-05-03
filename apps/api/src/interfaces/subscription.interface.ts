import { PaymentStatus, SubscriptionCategory } from '@prisma/client';
import { IFilter } from './filter.interface';

export interface GetSubscriptionByIdRequest {
  subscriptionId: string;
}

export interface AddSubscriptionRequest {
  category: SubscriptionCategory;
  paymentStatus: PaymentStatus;
  totalPrice: number;
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
  subscriptionId: string;
  userId?: string;
  developerId?: string;
  paymentProof?: Express.Multer.File;
}

export interface UpdateSubscriptionPaymentRepositoryRequest
  extends UpdateSubscriptionPaymentRequest {
  paymentProof?: string;
}

export interface GetSubscriptionsRequest extends IFilter {
  userId: string;
  paymentStatuses: PaymentStatus[];
}

export interface VerifySubscriptionOwnerRequest {
  subscriptionId: string;
  userId: string;
}

export interface GetSubscriptionTransactionStatusRequest {
  userId: string;
}

export interface GetSubscriptionPaymentBySlugRequest {
  slug: string;
}

export interface CheckPaymentExpirationsRequest {
  userId: string;
}

export interface SendSubscriptionExpiryReminderEmailRequest {
  destinationEmail: string;
  subscriptionPlan: string;
  expirationDate: Date;
}
