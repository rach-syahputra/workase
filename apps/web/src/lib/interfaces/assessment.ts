export interface IAssessment {
  id: string;
  skill: {
    id: string;
    title: string;
  };
  slug: string;
  image: string;
  shortDescription: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  hasPassed: boolean;
  totalQuestions?: number;
  totalEnrollmentCount?: number;
}

export interface IAssessmentQuestion {
  id: string;
  assessmentId: string;
  question: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  number?: number;
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

export interface ITopAssessment {
  id: string;
  skill: {
    id: string;
    title: string;
  };
  slug: string;
  image: string;
  shortDescription: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  totalEnrollmentCount: number;
}
