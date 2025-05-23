import {
  ICurrentCompany,
  IUserDetail,
  IUserMetadata,
  IUserStats,
} from '../user-stats';
import { APIResponse } from './response';

export interface GetUserStatsResponse extends APIResponse {
  data?: {
    stats: IUserStats;
  };
}

export interface GetUserDetailResponse extends APIResponse {
  data?: {
    user: IUserDetail;
  };
}

export interface GetCurrentCompaniesResponse extends APIResponse {
  data?: {
    currentCompanies: ICurrentCompany[];
  };
}

export interface GetUserMetadataResponse extends APIResponse {
  data?: {
    user: IUserMetadata;
  };
}
