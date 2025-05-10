import { IUserInformation } from '@/lib/cv-summary-generation';
import { ICvData } from '../cv';

export interface GetCvBySlugRequest {
  slug: string;
}

export interface AddCvRequest {
  data: ICvData;
  template: number;
}

export interface UpdateCvRequest {
  cvId: string;
  data: ICvData;
  template: number;
}

export interface GenerateCvSummaryRequest {
  userInformation: IUserInformation;
  apiKey: string;
}
