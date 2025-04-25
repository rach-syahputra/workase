import {
  ISubscription,
  ISubscriptionPayment,
  ISubscriptionWithPayment,
} from '../subscription';
import { APIResponse, IPagination } from './response';

export interface GetSubsciptionsResponse extends APIResponse {
  data?: {
    subscriptions: ISubscriptionWithPayment[];
    pagination: IPagination;
  };
}

export interface AddSubscriptionResponse extends APIResponse {
  data?: {
    subscription: ISubscriptionWithPayment;
  };
}

export interface UploadSubscriptionPaymentProofResponse extends APIResponse {
  data?: {
    subscription: ISubscription;
  };
}

export interface GetSubscriptionTransactionStatusResponse extends APIResponse {
  data?: {
    subscription: {
      pendingTransaction: ISubscriptionPayment;
    };
  };
}

export interface GetSubscriptionPaymentBySlugResponse extends APIResponse {
  data?: {
    subscriptionPayment: ISubscriptionPayment;
  };
}

export interface UpdateSubscriptionPaymentResponse extends APIResponse {
  data?: {
    subscriptionPayment: ISubscriptionPayment;
  };
}
