import { AxiosError } from 'axios';
import { APIResponse } from '../interfaces/api-response/response';

export const handleApiError = (error: unknown): APIResponse => {
  console.error('error fetching: ', error);

  if (error instanceof AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      return {
        success: false,
        code: 'ERR_NETWORK',
        error: {
          message: 'Please check your internet connection and try again.',
        },
      };
    } else if (error.status === 401) {
      return {
        success: false,
        code: 'ERR_UNAUTHENTICATED',
        error: {
          message: 'To continue, please log in to your account.',
        },
      };
    } else if (error.status === 403) {
      return {
        success: false,
        code: 'ERR_UNAUTHORIZED',
        error: {
          message: `You don't have permission to perform this action.`,
        },
      };
    } else {
      return error.response?.data;
    }
  }

  return {
    success: false,
    error: {
      message: 'Something went wrong. Please try again.',
    },
  };
};
