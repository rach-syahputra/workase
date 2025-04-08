export interface IAssessment {
  id: string;
  skill: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  totalQuestions?: number;
}

export interface IAssessmentQuestion {
  id: string;
  assessmentId: string;
  question: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  options: IAssessmentQuestionOption[];
}

export interface IAssessmentQuestionOption {
  id: string;
  assessmentQuestionId: string;
  option: string;
  isCorrect: boolean;
  createdAt: string;
  isDeleted: boolean;
}

export interface IAssessmentDetail extends IAssessment {
  questions: IAssessmentQuestion[];
}
