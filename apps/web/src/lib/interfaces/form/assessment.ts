export type IsCorrectOptionType = 0 | 1;

export interface AddAssessmentFormValues {
  skillId: string;
  image: File | null;
  shortDescription: string;
}

export interface AddAssessmentQuestionFormValues {
  assessmentId: string;
  question: string;
  image?: File | null;
  options: {
    text: string;
    isCorrect: IsCorrectOptionType;
  }[];
}
