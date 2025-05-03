export interface GenerateAssessmentQuestionRequest {
  skill: string;
  existingQuestions: string[];
  apiKey?: string;
  model?: string;
}
