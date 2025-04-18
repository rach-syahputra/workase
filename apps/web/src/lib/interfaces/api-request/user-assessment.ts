import { UserAssessmentStatus } from '../user-assessment';
import { IFilter } from './filter';

export interface AddUserAssessmentRequest {
  userId: string;
  assessment: {
    id: string;
    slug: string;
  };
  score: number;
  status: UserAssessmentStatus;
}

interface IAssessmentAnswer {
  assessmentQuestionId: string;
  selectedOptionId: string;
}

export interface CalculateAssessmentResultRequest {
  userAssessmentId: string;
  assessmentAnswers: IAssessmentAnswer[];
}

export interface GetUserAssessmentsRequest extends IFilter {
  userId: string;
  skill?: string;
}
