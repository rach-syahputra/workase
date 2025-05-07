import { getSession } from 'next-auth/react';

import {
  AddCompanyReviewRequest,
  AddSavedReviewRequest,
  GetCompanyReviewsRequest,
  GetCompaniesReviewsRequest,
  GetSavedReviewsRequest,
  RemoveSavedReviewRequest,
} from '../interfaces/api-request/company-review';
import {
  AddCompanyReviewResponse,
  AddSavedReviewResponse,
  GetCompaniesReviewsResponse,
  GetCompanyHeaderResponse,
  GetCompanyRatingResponse,
  GetCompanyReviewsResponse,
  GetSavedReviewsResponse,
  RemoveSavedReviewResponse,
  SearchCompanyReviewsResponse,
} from '../interfaces/api-response/company-review';
import { IFilter } from '../interfaces/api-request/filter';
import { axiosPrivate, axiosPublic } from '../axios';
import { handleApiError } from './error';

export const addCompanyReview = async (
  req: AddCompanyReviewRequest,
): Promise<AddCompanyReviewResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').post(
      `/companies/${req.companyId}/reviews`,
      req,
    );

    return response.data as AddCompanyReviewResponse;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyHeader = async (
  slug: string,
): Promise<GetCompanyHeaderResponse> => {
  try {
    const response = await axiosPublic.get(`/companies/${slug}/header`);

    return response.data as GetCompanyHeaderResponse;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyRating = async (
  slug: string,
): Promise<GetCompanyRatingResponse> => {
  try {
    const response = await axiosPublic.get(`/companies/${slug}/rating`);

    return response.data as GetCompanyRatingResponse;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyReviews = async (
  req: GetCompanyReviewsRequest,
): Promise<GetCompanyReviewsResponse> => {
  try {
    const session = await getSession();

    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req?.q);
    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.cursor) queryParams.append('cursor', req?.cursor);
    if (session?.user?.id) queryParams.append('userId', session.user.id);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/companies/${req.slug}/reviews${query ? `?${query}` : ''}`,
    );

    return response.data as GetCompanyReviewsResponse;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompaniesReviews = async (
  req?: GetCompaniesReviewsRequest,
): Promise<GetCompaniesReviewsResponse> => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req.q);
    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.cursor) queryParams.append('cursor', req?.cursor);
    if (userId) queryParams.append('userId', userId);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/companies/reviews${query ? `?${query}` : ''}`,
    );

    return response.data as GetCompaniesReviewsResponse;
  } catch (error) {
    return handleApiError(error);
  }
};

export const searchCompanyReviews = async (
  req?: IFilter,
): Promise<SearchCompanyReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req.q || '');

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/search/companies/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addSavedReview = async (
  req: AddSavedReviewRequest,
): Promise<AddSavedReviewResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').post(
      `/companies/${req.companySlug}/reviews/${req.companyReviewId}/bookmark`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const removeSavedReview = async (
  req: RemoveSavedReviewRequest,
): Promise<RemoveSavedReviewResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').delete(
      `/companies/${req.companySlug}/reviews/${req.companyReviewId}/bookmark`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSavedReviews = async (
  req?: GetSavedReviewsRequest,
): Promise<GetSavedReviewsResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.q) queryParams.append('q', req?.q);

    const query = queryParams.toString();
    const response = await axiosPrivate(token || '').get(
      `/saved-reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
