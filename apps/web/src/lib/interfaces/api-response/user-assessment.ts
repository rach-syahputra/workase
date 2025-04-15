import { IAddUserAssessment, IAssessmentResult } from '../user-assessment';
import { APIResponse } from './response';

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
