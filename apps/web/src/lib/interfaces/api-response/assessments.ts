import {
  IAssessment,
  IAssessmentDetail,
  IAssessmentQuestion,
} from '../assessment';
import { APIResponse, IPagination } from './response';

export interface AddAssessmentResponse extends APIResponse {
  data?: {
    assessment: IAssessment;
  };
}

export interface GetAssessmentsResponse extends APIResponse {
  data?: {
    assessments: IAssessment[];
    pagination?: IPagination;
  };
}

export interface GetAssessmentByIdResponse extends APIResponse {
  data?: {
    assessment: IAssessmentDetail;
  };
}

export interface GetAssessmentQuestionsResponse extends APIResponse {
  data?: {
    assessmentQuestions: IAssessmentQuestion[];
    pagination?: IPagination;
  };
}

export interface AddAssessmentQuestionResponse extends APIResponse {
  data?: {
    question: IAssessmentQuestion;
  };
}
