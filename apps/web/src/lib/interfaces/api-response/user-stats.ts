import { IUserDetail, IUserStats } from '../user-stats';
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
