'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IAssessmentQuestion } from '@/lib/interfaces/assessment';
import { getAssessmentQuestions } from '@/lib/apis/assessment-question';
import { scrollToTop } from '@/lib/utils';
import {
  IBrowseAssessmentQuestionContext,
  IFetchAssessmentQuestionsRequest,
} from './interface';
import { useAssessmentQuestionContext } from '../assessment-question-context';
import { OrderType } from '@/lib/interfaces/api-request/filter';

const BrowseAssessmentQuestionContext = createContext<
  IBrowseAssessmentQuestionContext | undefined
>(undefined);

const BrowseAssessmentProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<OrderType>('desc');
  const [searchQuestion, setSearchQuestion] = useState<string>('');
  const [debouncedSearchQuestion, setDebouncedSearchQuestion] =
    useState<string>('');
  const [questions, setQuestions] = useState<IAssessmentQuestion[]>([]);
  const limit = 10;

  const fetchAssessmentQuestions = useCallback(
    async (req?: IFetchAssessmentQuestionsRequest) => {
      setIsLoading(true);

      const response = await getAssessmentQuestions({
        limit,
        page: req?.page || page,
        slug,
        order,
        question: debouncedSearchQuestion,
      });

      if (response.success) {
        setQuestions(
          response.data?.assessmentQuestions.map((question, index) => ({
            ...question,
            number: ((page ? page : 1) - 1) * limit + index + 1,
          })) || [],
        );
        setTotalPages(response.data?.pagination?.totalPages || 1);
        setTotalQuestions(response.data?.pagination?.totalData || 0);
        setPage(response.data?.pagination?.page || 1);
        scrollToTop();
      }

      setIsLoading(false);
    },
    [debouncedSearchQuestion, order, page, slug],
  );

  useEffect(() => {
    fetchAssessmentQuestions();
  }, [fetchAssessmentQuestions]);

  useEffect(() => {});

  return (
    <BrowseAssessmentQuestionContext.Provider
      value={{
        isLoading,
        setIsLoading,
        totalPages,
        setTotalPages,
        totalQuestions,
        setTotalQuestions,
        page,
        setPage,
        order,
        setOrder,
        searchQuestion,
        setSearchQuestion,
        debouncedSearchQuestion,
        setDebouncedSearchQuestion,
        questions,
        setQuestions,
        fetchAssessmentQuestions,
      }}
    >
      {children}
    </BrowseAssessmentQuestionContext.Provider>
  );
};

const useBrowseAssessmentQuestionContext =
  (): IBrowseAssessmentQuestionContext => {
    const context = useContext(BrowseAssessmentQuestionContext);
    if (context === undefined) {
      throw new Error(
        'useBrowseAssessmentQuestionContext must be used within a BrowseAssessmentProvider',
      );
    }
    return context;
  };

export { BrowseAssessmentProvider, useBrowseAssessmentQuestionContext };
