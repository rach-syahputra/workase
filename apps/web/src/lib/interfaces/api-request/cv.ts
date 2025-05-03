import { ICvData } from '../cv';

export interface GetCvBySlugRequest {
  slug: string;
}

export interface AddCvRequest {
  data: ICvData;
}

export interface UpdateCvRequest {
  cvId: string;
  data: ICvData;
}
