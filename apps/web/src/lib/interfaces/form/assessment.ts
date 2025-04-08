export type IsCorrectOptionType = 0 | 1;

export interface AddAssessmentFormValues {
  skillId: string;
}

export interface AddAssessmentQuestionFormValues {
  assessmentId: string;
  question: string;
  image?: string;
  options: {
    text: string;
    isCorrect: IsCorrectOptionType;
  }[];
}
