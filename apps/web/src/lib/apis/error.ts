import type { AxiosError } from '../../../../../node_modules/axios';

import { APIResponse } from '../interfaces/api-response/response';

export const handleApiError = (error: unknown): APIResponse => {
  console.error('error fetching: ', error);

  if (error && typeof error === 'object') {
    if ((error as AxiosError).code === 'ERR_NETWORK') {
      return {
        success: false,
        code: 'ERR_NETWORK',
        error: {
          message: 'Please check your internet connection and try again.',
        },
      };
    } else if ('status' in error && error.status === 401) {
      return {
        success: false,
        code: 'ERR_UNAUTHENTICATED',
        error: {
          message: 'To continue, please log in to your account.',
        },
      };
    } else if ('status' in error && error.status === 403) {
      return {
        success: false,
        code: 'ERR_UNAUTHORIZED',
        error: {
          message: `You don't have permission to perform this action.`,
        },
      };
    } else {
      return (error as AxiosError).response?.data as APIResponse;
    }
  }

  return {
    success: false,
    error: {
      message: 'Something went wrong. Please try again.',
    },
  };
};
