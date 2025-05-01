import { ICv } from '../cv';
import { APIResponse } from './response';

export interface GetCvBySlugResponse extends APIResponse {
  data?: {
    cv: ICv;
  };
}

export interface UpdateCvResponse extends APIResponse {
  data?: {
    cv: ICv;
  };
}
