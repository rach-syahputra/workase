export type UserAssessmentStatus = 'ON_GOING' | 'FAILED' | 'PASSED';

export interface IUserAssessmentSession {
  userAssessmentId: string;
  assessmentId: string;
  userId: string;
  startTime: string;
}

export interface IAssessmentResult {
  userAssessmentId: string;
  userId: string;
  status: UserAssessmentStatus;
  score: number;
}

export interface IAddUserAssessment {
  id: string;
  userId: string;
  assessmentId: string;
  status: UserAssessmentStatus;
  score: number;
  createdAt: string;
  isDeleted: boolean;
  token?: string;
}
