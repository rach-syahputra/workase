import { Dispatch, SetStateAction } from 'react';

import { IAssessmentQuestion } from '@/lib/interfaces/assessment';
import { OrderType } from '@/lib/interfaces/api-request/filter';

export interface IFetchAssessmentQuestionsRequest {
  page?: number;
}

export interface IBrowseAssessmentQuestionContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  totalQuestions: number;
  setTotalQuestions: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  order: OrderType;
  setOrder: Dispatch<SetStateAction<OrderType>>;
  searchQuestion: string;
  setSearchQuestion: Dispatch<SetStateAction<string>>;
  debouncedSearchQuestion: string;
  setDebouncedSearchQuestion: Dispatch<SetStateAction<string>>;
  questions: IAssessmentQuestion[];
  setQuestions: Dispatch<SetStateAction<IAssessmentQuestion[]>>;
  fetchAssessmentQuestions: (req?: IFetchAssessmentQuestionsRequest) => void;
}
