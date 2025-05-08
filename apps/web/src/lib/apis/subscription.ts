import { getSession } from 'next-auth/react';

import { axiosPrivate } from '../axios';
import {
  AddSubscriptionRequest,
  GetSubscriptionPaymentBySlugRequest,
  GetSubscriptionsRequest,
  UpdateSubscriptionPaymentRequest,
  UploadSubscriptionPaymentProofRequest,
} from '../interfaces/api-request/subscription';
import {
  AddSubscriptionResponse,
  GetSubsciptionsResponse,
  GetSubscriptionPaymentBySlugResponse,
  GetSubscriptionTransactionStatusResponse,
  UpdateSubscriptionPaymentResponse,
  UploadSubscriptionPaymentProofResponse,
} from '../interfaces/api-response/subscription';
import { handleApiError } from './error';

export const getSubscriptions = async (
  req?: GetSubscriptionsRequest,
): Promise<GetSubsciptionsResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.status && !req?.status?.includes('ALL') && req.status.length > 0)
      queryParams.append('status', req.status.join(','));
    if (req?.category && req.category !== 'ALL')
      queryParams.append('category', req?.category.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token || '').get(
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
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').post(
      '/subscriptions',
      req,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadSubcsriptionPaymentProof = async (
  req?: UploadSubscriptionPaymentProofRequest,
): Promise<UploadSubscriptionPaymentProofResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const formData = new FormData();
    if (req?.paymentProof) {
      formData.append('paymentProof', req.paymentProof);
    }

    const response = await axiosPrivate(token || '', 'multipart/form-data').put(
      `/subscriptions/${req?.subscriptionId}/payments/${req?.subscriptionPaymentId}/payment-proof/upload`,
      formData,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSubscriptionTransactionStatus =
  async (): Promise<GetSubscriptionTransactionStatusResponse> => {
    try {
      const session = await getSession();
      const token = session?.user?.accessToken;

      const response = await axiosPrivate(token || '').get(
        '/subscriptions/transaction-status',
      );

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

export const getSubscriptionPaymentBySlug = async (
  req: GetSubscriptionPaymentBySlugRequest,
): Promise<GetSubscriptionPaymentBySlugResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').get(
      `/subscription-payments/${req.slug}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateSubscriptionPayment = async (
  req: UpdateSubscriptionPaymentRequest,
): Promise<UpdateSubscriptionPaymentResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').put(
      `/subscriptions/${req.subscriptionId}/payments/${req.subscriptionPaymentId}`,
      {
        paymentStatus: req.paymentStatus,
      },
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
