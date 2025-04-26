import { IGeneratedQuestion } from '../assessment-question';
import { APIResponse } from './response';

export interface GenerateAssessmentQuestionResponse extends APIResponse {
  data?: {
    content: IGeneratedQuestion;
  };
}
