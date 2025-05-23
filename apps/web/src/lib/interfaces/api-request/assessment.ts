import { IFilter } from './filter';

export type IsCorrectOptionType = 0 | 1;

export interface GetAssessmentsRequest extends IFilter {
  skill?: string;
}

export interface GetAssessmentDiscoveryRequest extends IFilter {
  skill?: string;
}

export interface GetAssessmentBySlugRequest {
  isOnClient: boolean;
  slug: string;
  token?: string;
}

export interface GetAvailableSkillsRequest extends IFilter {
  title?: string;
}

export interface AddAssessmentRequest {
  skillId: string;
  image: File | null;
  shortDescription: string;
}

export interface GetAssessmentQuestionsRequest extends IFilter {
  slug: string;
  question?: string;
  randomize?: 'true' | 'false';
}

export interface AddAssessmentQuestionRequest {
  assessmentId: string;
  question: string;
  image?: File | null;
  options: {
    text: string;
    isCorrect: IsCorrectOptionType;
  }[];
}

export interface DeleteAssessmentQuestionRequest {
  assessmentId: string;
  assessmentQuestionId: string;
}

export interface GetAssessmentMetadataRequest {
  slug: string;
}

export interface DeleteAssessmentRequest {
  assessmentId: string;
}
