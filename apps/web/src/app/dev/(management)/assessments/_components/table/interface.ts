export interface IAssessmentColumn {
  slug: string;
  skill: string;
  totalQuestions: number;
  updatedAt: string;
}

export interface GetAssessmentColumnsRequest {
  onLastUpdatedHeaderClick: () => void;
}
