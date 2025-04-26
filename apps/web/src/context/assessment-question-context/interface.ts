import { Dispatch, SetStateAction } from 'react';

import { IAssessmentDetail } from '@/lib/interfaces/assessment';

export interface IAssessmentQuestionContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  assessment: IAssessmentDetail | undefined;
  setAssessment: Dispatch<SetStateAction<IAssessmentDetail | undefined>>;
  skillTitle: string | undefined;
  fetchAssessmentBySlug: () => void;
}
