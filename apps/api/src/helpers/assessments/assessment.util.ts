import {
  AssessmentSortType,
  IQuestionOption,
} from '@/interfaces/assessment.interface';
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

export const shuffleQuestionOptions = (questionOptions: IQuestionOption[]) => {
  const shuffledOptions = [...questionOptions];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [
      shuffledOptions[j],
      shuffledOptions[i],
    ];
  }

  return shuffledOptions;
};
