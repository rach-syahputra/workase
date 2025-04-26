import { IUserStats } from '../user-stats';
import { APIResponse } from './response';

export interface GetUserStatsResponse extends APIResponse {
  data?: {
    stats: IUserStats;
  };
}
