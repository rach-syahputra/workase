import { APIResponse } from './response';

export interface DeveloperLoginResponse extends APIResponse {
  data?: {
    accessToken: string;
  };
}
