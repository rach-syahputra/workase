export interface IAssessmentColumn {
  id: string;
  slug: string;
  skill: string;
  totalQuestions: number;
  updatedAt: string;
}

export interface GetAssessmentColumnsRequest {
  onLastUpdatedHeaderClick: () => void;
  onDeleteAssessment: (assessmentId: string) => void;
}
