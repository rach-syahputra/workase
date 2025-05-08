import { getSession } from 'next-auth/react';

import { axiosPrivate, axiosPublic } from '../axios';
import {
  GetCurrentCompaniesResponse,
  GetUserDetailResponse,
  GetUserStatsResponse,
} from '../interfaces/api-response/user-stats';
import { handleApiError } from './error';
import {
  GetCurrentCompaniesRequest,
  GetUserDetailRequest,
} from '../interfaces/api-request/user-stats';

export const getUserStats = async (): Promise<GetUserStatsResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').get('/users/stats');

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserDetail = async (
  req: GetUserDetailRequest,
): Promise<GetUserDetailResponse> => {
  try {
    const response = await axiosPublic.get(`/users/${req.slug}/detail`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCurrentCompanies = async (
  req: GetCurrentCompaniesRequest,
): Promise<GetCurrentCompaniesResponse> => {
  try {
    const response = await axiosPrivate(req.token || '').get(
      `/users/current-companies`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
