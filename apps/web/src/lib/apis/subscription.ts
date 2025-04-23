import { axiosPublic } from '../axios';
import {
  AddSubscriptionRequest,
  GetSubscriptionsRequest,
} from '../interfaces/api-request/subscription';
import {
  AddSubscriptionResponse,
  GetSubsciptionsResponse,
} from '../interfaces/api-response/subscription';
import { handleApiError } from './error';

export const getSubscriptions = async (
  req?: GetSubscriptionsRequest,
): Promise<GetSubsciptionsResponse> => {
  try {
    // TO DO: retrieve token from session
    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/subscriptions${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addSubscription = async (
  req?: AddSubscriptionRequest,
): Promise<AddSubscriptionResponse> => {
  try {
    const response = await axiosPublic.post('/subscriptions', req);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
