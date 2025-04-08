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

export interface AddAssessmentRequest {
  skillId: string;
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
