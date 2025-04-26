import { getSession } from 'next-auth/react';

import { axiosPrivate } from '../axios';
import { GetUserStatsResponse } from '../interfaces/api-response/user-stats';
import { handleApiError } from './error';

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
