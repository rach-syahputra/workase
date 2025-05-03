import { ICertificate } from './certificate';

export type UserAssessmentActiveTab = 'discovery' | 'history';
export type UserAssessmentStatus = 'ON_GOING' | 'FAILED' | 'PASSED';

export interface IUserAssessmentSession {
  userAssessmentId: string;
  assessment: {
    id: string;
    slug: string;
    skillTitle: string;
    date: string;
  };
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

export interface IUserAssessment {
  id: string;
  assessmentId: string;
  userId: string;
  score: number;
  status: UserAssessmentStatus;
  createdAt: string;
  isDeleted: boolean;
  skill: {
    id: string;
    title: string;
  };
  certificate?: ICertificate | null;
  sessionToken: string | null;
}
