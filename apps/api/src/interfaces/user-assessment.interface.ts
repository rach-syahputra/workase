import { UserAssessmentStatus } from '@prisma/client';
import { IFilter } from './filter.interface';

export interface UserAssessmentToken {
  assessment: {
    id: string;
    slug: string;
    skillTitle: string;
    date: string;
  };
  userId: string;
  userAssessmentId: string;
  startTime: string;
}

export interface IAssessmentAnswer {
  assessmentQuestionId: string;
  selectedOptionId: string;
}

export interface GetUserAssessmentByIdRequest {
  userAssessmentId: string;
}

export interface AddUserAssessmentRequest {
  userId: string;
  assessment: {
    id: string;
    slug: string;
  };
  subscriptionId: string;
  score: number;
  sessionToken?: string;
  status: UserAssessmentStatus;
}

export interface CalculateAssessmentResultRequest {
  userAssessmentId: string;
  assessmentAnswers: IAssessmentAnswer[];
}

export interface UpdateUserAssessmentRequest {
  userAssessmentId: string;
  score?: number;
  status?: UserAssessmentStatus;
  sessionToken?: string;
}

export interface GetUserAssessmentRequest extends IFilter {
  userId: string;
  skill?: string;
}

export interface GetUserAssessmentRequest extends IFilter {
  userId: string;
  skill?: string;
}
