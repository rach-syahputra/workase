import { AssessmentSortType } from '@/interfaces/assessment.interface';
import { OrderType } from '@/interfaces/filter.interface';

export const getAssessmentsOrderConfig = (
  sortBy: AssessmentSortType,
  order: OrderType,
): Record<string, any> => {
  switch (sortBy) {
    case 'skill':
      return { skill: { title: order ?? 'asc' } };
    case 'totalQuestions':
      return { AssessmentQuestion: { _count: order ?? 'desc' } };
    default:
      return { updatedAt: order ?? 'desc' };
  }
};
