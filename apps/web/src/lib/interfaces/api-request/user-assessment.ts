import { UserAssessmentStatus } from '../user-assessment';

export interface AddUserAssessmentRequest {
  userId: string;
  assessmentId: string;
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
