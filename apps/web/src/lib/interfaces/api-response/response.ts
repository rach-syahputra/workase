type ERROR_CODE = 'ERR_NETWORK' | 'ERR_UNAUTHENTICATED' | 'ERR_UNAUTHORIZED';

export interface APIResponse {
  success: boolean;
  code?: ERROR_CODE;
  message?: string;
  error?: {
    message: string;
  };
}

export interface ICursorPagination {
  totalData: number;
  cursor: string | null;
}

export interface IPagination {
  totalData: number;
  totalPages: number;
  page: number;
}
