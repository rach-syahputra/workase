import { AddCompanyReviewRequest } from '../interfaces/api-request/company-review';
import {
  AddCompanyReviewResponse,
  GetCompaniesReviewsResponse,
  GetCompanyHeaderResponse,
  GetCompanyRatingResponse,
  GetCompanyReviewsResponse,
  SearchCompanyReviewsResponse,
} from '../interfaces/api-response/company-review';
import { IFilter } from '../interfaces/api-request/filter';
import { axiosPrivate, axiosPublic } from '../axios';
import {
  AddCompanyReviewResponse,
  GetCompanyHeaderResponse,
  GetCompanyRatingResponse,
  GetCompanyReviewsResponse,
  SearchCompanyReviewsResponse,
} from '../interfaces/api-response/company-review';
import { IFilter } from '../interfaces/api-request/filter';
import { axiosPrivate, axiosPublic } from '../axios';
import { handleApiError } from './error';

export const addCompanyReview = async (
  req: AddCompanyReviewRequest,
export const addCompanyReview = async (
  req: AddCompanyReviewRequest,
): Promise<AddCompanyReviewResponse> => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5vdmktYXp5LXdrd2siLCJlbWFpbCI6Im5vdmlhenlAdXNlci5jb20iLCJqb2JJZCI6ImdycGhjLWRnbi0xIiwiaWF0IjoxNzQyOTEyMDk2LCJleHAiOjE3NDU1MDQwOTZ9.MZwoRDHghUh28fGZyOg7cDmIKN7O83PLUl_B7Do7zb4';
    const response = await axiosPrivate(token).post(
      `/companies/${req.companyId}/reviews`,
      req,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyHeader = async (
  companyId: string,
): Promise<GetCompanyHeaderResponse> => {
  try {
    const response = await axiosPublic.get(`/companies/${companyId}/header`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyRating = async (
  companyId: string,
): Promise<GetCompanyRatingResponse> => {
  try {
    const response = await axiosPublic.get(`/companies/${companyId}/rating`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyReviews = async (
  companyId: string,
  req?: IFilter,
): Promise<GetCompanyReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

<<<<<<< HEAD
    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.cursor) queryParams.append('cursor', req?.cursor);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/companies/${companyId}/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompaniesReviews = async (
  req?: IFilter,
): Promise<GetCompaniesReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req.q);
    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.cursor) queryParams.append('cursor', req?.cursor);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/companies/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const searchCompanyReviews = async (
  req?: IFilter,
): Promise<SearchCompanyReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req.q);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/search/companies/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
      `/companies/${req.companyId}/reviews`,
      req,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyHeader = async (
  companyId: string,
): Promise<GetCompanyHeaderResponse> => {
  try {
    const response = await axiosPublic.get(`/companies/${companyId}/header`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyRating = async (
  companyId: string,
): Promise<GetCompanyRatingResponse> => {
  try {
    const response = await axiosPublic.get(`/companies/${companyId}/rating`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompanyReviews = async (
  companyId: string,
  req?: IFilter,
): Promise<GetCompanyReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req?.q);
=======
>>>>>>> 80e554f (feat(web): implement search company reviews)
    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.cursor) queryParams.append('cursor', req?.cursor);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/companies/${companyId}/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCompaniesReviews = async (
  req?: IFilter,
): Promise<GetCompanyReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req.q);
    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.cursor) queryParams.append('cursor', req?.cursor);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/companies/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const searchCompanyReviews = async (
  req?: IFilter,
): Promise<SearchCompanyReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (req?.q) queryParams.append('q', req.q);

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/search/companies/reviews${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
