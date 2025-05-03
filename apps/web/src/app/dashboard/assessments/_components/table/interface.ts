import { ICertificate } from '@/lib/interfaces/certificate';
import { UserAssessmentStatus } from '@/lib/interfaces/user-assessment';

export interface IUserAssessmentColumn {
  id: string;
  skill: {
    id: string;
    title: string;
  };
  score: number;
  status: UserAssessmentStatus;
  createdAt: string;
  sessionToken: string | null;
  certificate?: ICertificate | null;
}

export interface GetAssessmentDiscoveryColumnsRequest {
  onEnrollmentDateClick: () => void;
}
