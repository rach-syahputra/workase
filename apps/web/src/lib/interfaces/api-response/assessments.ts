import {
  IAssessment,
  IAssessmentDetail,
  IAssessmentQuestion,
  ITopAssessment,
} from '../assessment';
import { ISkill } from '../skill';
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

export interface GetAssessmentDiscoveryResponse extends APIResponse {
  data?: {
    assessments: IAssessment[];
    pagination?: IPagination;
  };
}

export interface GetAssessmentBySlugResponse extends APIResponse {
  data?: {
    assessment: IAssessmentDetail;
  };
}

export interface GetAvailableSkillsResponse extends APIResponse {
  data?: {
    skills: ISkill[];
    pagination?: IPagination;
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

export interface GetTopAssessmentsResponse extends APIResponse {
  data?: {
    topAssessments: ITopAssessment[];
  };
}

export interface DeleteAssessmentQuestionResponse extends APIResponse {}
