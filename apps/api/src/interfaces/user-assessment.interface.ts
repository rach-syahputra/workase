import { UserAssessmentStatus } from '@prisma/client';

export interface UserAssessmentToken {
  assessmentId: string;
  userId: string;
  userAssessmentId: string;
  startTime: string;
}

export interface IAssessmentAnswer {
  assessmentQuestionId: string;
  selectedOptionId: string;
}

export interface AddUserAssessmentRequest {
  userId: string;
  assessmentId: string;
  score: number;
  status: UserAssessmentStatus;
}

export interface CalculateAssessmentResultRequest {
  userAssessmentId: string;
  assessmentAnswers: IAssessmentAnswer[];
}

export interface UpdateUserAssessmentRequest {
  userAssessmentId: string;
  score: number;
  status: UserAssessmentStatus;
}
