import { ISubscription, ISubscriptionWithPayment } from '../subscription';
import { APIResponse, IPagination } from './response';

export interface GetSubsciptionsResponse extends APIResponse {
  data?: {
    subscriptions: ISubscriptionWithPayment[];
    pagination: IPagination;
  };
}

export interface AddSubscriptionResponse extends APIResponse {
  data?: {
    subscription: ISubscription;
  };
}
