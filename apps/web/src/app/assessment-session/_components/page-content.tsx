'use client';

import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import jwt from 'jsonwebtoken';

import { IUserAssessmentSession } from '@/lib/interfaces/user-assessment';
import { getAssessmentQuestions } from '@/lib/apis/assessment-question';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import Container from '@/components/layout/container';
import AppLoading from '@/components/ui/app-loading';
import AssessmentSessionQuestion from './assessment-session-question';
import AssessmentSessionHeader from './assessment-session-header';
import AssessmentSessionNavbar from './assessment-session-navbar';
import { AssessmentSessionPaginationMobile } from './assessment-session-pagination';

const PageContent = () => {
  const searchParams = useSearchParams();
  const {
    isLoading,
    page,
    questions,
    currentQuestion,
    setIsLoading,
    setUserAssessment,
    setQuestions,
    setCurrentQuestion,
    getAssessmentSessionFromLocalStorage,
  } = useAssessmentSessionContext();

  const fetchGetAssessmentQuestions = useCallback(async () => {
    setIsLoading(true);

    // Retrieve token from url query
    const userAssessmentToken = searchParams.get('token');

    if (userAssessmentToken) {
      const userAssessmentSession = jwt.decode(
        userAssessmentToken,
      ) as IUserAssessmentSession;

      setUserAssessment({
        ...userAssessmentSession,
        startTime: new Date(userAssessmentSession.startTime),
      });

      const response = await getAssessmentQuestions({
        slug: userAssessmentSession.assessment.slug,
        limit: 25,
        randomize: 'true',
      });

      const assessmentQuestions = response.data?.assessmentQuestions;
      const assessmentSession = getAssessmentSessionFromLocalStorage();

      if (response.success && assessmentQuestions && assessmentSession) {
        // Initiate questions based on api response and local storage
        setQuestions(
          assessmentQuestions?.map((question, index) => {
            const assessmentQuestionFromLocalStorage =
              assessmentSession.questions?.find((q) => q.id === question.id);

            return {
              ...question,
              number: index + 1,
              selectedOption: {
                id: assessmentQuestionFromLocalStorage?.selectedOptionId || '',
                number: assessmentQuestionFromLocalStorage?.number || 0,
              },
            };
          }) || [],
        );

        // Initiate currentQuestion based on api response and local storage
        const currentAssessmentQuestion =
          assessmentQuestions?.[assessmentSession.currentPage - 1];
        const assessmentQuestionFromLocalStorage =
          assessmentSession.questions?.find(
            (q) => q.id === currentAssessmentQuestion.id,
          );
        setCurrentQuestion({
          ...currentAssessmentQuestion,
          number: assessmentSession.currentPage,
          selectedOption: {
            id: assessmentQuestionFromLocalStorage?.selectedOptionId || '',
            number: assessmentQuestionFromLocalStorage?.number || 0,
          },
        });
      }
    }

    setIsLoading(false);
  }, [
    searchParams,
    getAssessmentSessionFromLocalStorage,
    setCurrentQuestion,
    setQuestions,
    setIsLoading,
    setUserAssessment,
  ]);

  useEffect(() => {
    fetchGetAssessmentQuestions();
  }, [fetchGetAssessmentQuestions]);

  return isLoading ? (
    <div className="bg-background fixed left-0 top-0 z-[100] flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Getting assessment ready" />
    </div>
  ) : page > 0 && questions.length > 0 && currentQuestion ? (
    <div className="bg-primary-gray-background w-full transition-all duration-300 ease-in-out">
      <AssessmentSessionNavbar />
      <Container className="pt-assessment-session-navbar-height flex min-h-[calc(100svh-60px)] flex-col gap-4 py-0">
        <AssessmentSessionHeader />
        <AssessmentSessionQuestion />
      </Container>
      <AssessmentSessionPaginationMobile />
    </div>
  ) : (
    <Container className="pt-assessment-session-navbar-height flex min-h-[calc(100svh-60px)] flex-col gap-4 py-0">
      <p>Something wrong with the question</p>
    </Container>
  );
};

export default PageContent;
