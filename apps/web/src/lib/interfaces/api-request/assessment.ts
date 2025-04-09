import { IFilter } from './filter';

export type IsCorrectOptionType = 0 | 1;

export interface GetAssessmentsRequest extends IFilter {
  skill?: string;
}

export interface GetAssessmentByIdRequest {
  id: string;
}

export interface GetAvailableSkillsRequest extends IFilter {
  title?: string;
}

export interface AddAssessmentRequest {
  skillId: string;
}

export interface GetAssessmentQuestionsRequest extends IFilter {
  assessmentId: string;
  question?: string;
}

export interface AddAssessmentQuestionRequest {
  assessmentId: string;
  question: string;
  image?: string | null;
  options: {
    text: string;
    isCorrect: IsCorrectOptionType;
  }[];
}
