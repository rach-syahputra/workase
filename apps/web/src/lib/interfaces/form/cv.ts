import { ICvData } from '../cv';

export interface AddCvFormValues {
  data: ICvData;
  template: number;
}

export interface AutoGenerateSummaryFormValues {
  softSkills?: string;
  yearsOfExperience?: number;
  achievement?: string;
  careerObjective?: string;
}
