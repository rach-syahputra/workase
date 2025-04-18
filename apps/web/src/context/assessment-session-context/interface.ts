import { Dispatch, SetStateAction } from 'react';

import { IAssessmentQuestion } from '@/lib/interfaces/assessment';

export interface IUserAssessment {
  userAssessmentId: string;
  assessment: {
    id: string;
    slug: string;
    date: string;
    skillTitle: string;
  };
  userId: string;
  startTime: Date;
}

export interface ISelectOptionPayload {
  questionId: string;
  number: number;
  optionId: string;
}

export interface IQuestionLocalStorage {
  id: string;
  number: number;
  selectedOptionId: string;
}

export interface IAssessmentSessionLocalStorage {
  currentPage: number;
  progress: number;
  questions: IQuestionLocalStorage[];
}

export interface ICurrentQuestion extends IAssessmentQuestion {
  selectedOption: {
    id: string;
    number: number;
  };
}

export interface IAssessmentSessionContext {
  onTopOfScreen: boolean;
  setOnTopOfScreen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  userAssessment: IUserAssessment | null;
  setUserAssessment: Dispatch<SetStateAction<IUserAssessment | null>>;
  questions: ICurrentQuestion[];
  setQuestions: Dispatch<SetStateAction<ICurrentQuestion[]>>;
  currentQuestion: ICurrentQuestion | null;
  setCurrentQuestion: Dispatch<SetStateAction<ICurrentQuestion | null>>;
  selectedOptionIndex: number | null;
  setSelectedOptionIndex: Dispatch<SetStateAction<number | null>>;
  selectedOptionId: string;
  setSelectedOptionId: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  getAssessmentSessionFromLocalStorage: () =>
    | IAssessmentSessionLocalStorage
    | null
    | undefined;
  handleSelectOption: (payload: ISelectOptionPayload) => void;
  handlePagination: (page: number) => void;
  isSessionOver: boolean;
  setIsSessionOver: Dispatch<SetStateAction<boolean>>;
}
