import { IFilter } from './filter';

export type IsCorrectOptionType = 0 | 1;

export interface GetAssessmentsRequest extends IFilter {
  skill?: string;
}

export interface GetAssessmentBySlugRequest {
  slug: string;
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
  id: string;
  question?: string;
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
