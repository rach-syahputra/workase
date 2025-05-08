import { ICvData } from '../cv';

export interface AddCvFormValues {
  data: ICvData;
}

export interface AutoGenerateSummaryFormValues {
  softSkills?: string;
  yearsOfExperience?: number;
  achievement?: string;
  careerObjective?: string;
}
