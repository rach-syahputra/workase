import { IFilter } from './filter';

export interface GetSubscriptionsRequest extends IFilter {}

export interface AddSubscriptionRequest {
  category: 'STANDARD' | 'PROFESSIONAL';
  paymentStatus: 'PENDING';
}
