import {
  IAddUserAssessment,
  IAssessmentResult,
  IUserAssessment,
} from '../user-assessment';
import { APIResponse, IPagination } from './response';

export interface AddUserAssessmentResponse extends APIResponse {
  data?: {
    userAssessment: IAddUserAssessment;
  };
}

export interface CalculateAssessmentResultResponse extends APIResponse {
  data?: {
    userAssessment: IAssessmentResult;
  };
}

export interface GetUserAssessmentsRespone extends APIResponse {
  data?: {
    userAssessments: IUserAssessment[];
    pagination: IPagination;
  };
}
