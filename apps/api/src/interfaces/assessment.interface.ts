import { IFilter } from './filter.interface';

export type IsCorrectOptionType = 0 | 1;
export type AssessmentSortType = 'skill' | 'totalQuestions' | 'updatedAt';

export interface IQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface GetAssessmentsRequest extends IFilter {
  skill?: string;
  sortBy?: AssessmentSortType;
}

export interface GetAssessmentByIdRequest {
  id: string;
}

export interface GetAvailableSkillsRequest extends IFilter {
  title: string;
}

export interface AddAssessmentServiceRequest {
  skillId: string;
  image?: Express.Multer.File;
  shortDescription: string;
}

export interface AddAssessmentRepositoryRequest {
  skillId: string;
  image?: string;
  shortDescription: string;
}

export interface GetAssessmentQuestionsRequest extends IFilter {
  assessmentId: string;
  question?: string;
}

export interface AddAssessmentQuestionBodyRequest {
  question: string;
  image?: string;
  options: {
    text: string;
    isCorrect: IsCorrectOptionType;
  }[];
}

export interface AddAssessmentQuestionServiceRequest {
  assessmentId: string;
  question: string;
  image?: Express.Multer.File;
  options: IQuestionOption[];
}

export interface AddAssessmentQuestionRepositoryRequest {
  assessmentId: string;
  question: string;
  image?: string;
  options: IQuestionOption[];
}
