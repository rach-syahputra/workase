'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { getLocalStorage, setLocalStorage } from '@/hooks/use-local-storage';
import { ASSESSMENT_SESSION_KEY } from '@/lib/constants/assessment';
import { scrollToTop } from '@/lib/utils';
import {
  IAssessmentSessionContext,
  IAssessmentSessionLocalStorage,
  ICurrentQuestion,
  IQuestionLocalStorage,
  ISelectOptionPayload,
  IUserAssessment,
} from './interface';

const AssessmentSessionContext = createContext<
  IAssessmentSessionContext | undefined
>(undefined);

const AssessmentSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onTopOfScreen, setOnTopOfScreen] = useState(true);
  const [userAssessment, setUserAssessment] = useState<IUserAssessment | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<ICurrentQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState<ICurrentQuestion | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isSessionOver, setIsSessionOver] = useState<boolean>(false);

  const getAssessmentSessionFromLocalStorage = ():
    | IAssessmentSessionLocalStorage
    | null
    | undefined => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return getLocalStorage(ASSESSMENT_SESSION_KEY);
    }
  };

  const handleSelectOption = async (payload: ISelectOptionPayload) => {
    const assessmentSession = getAssessmentSessionFromLocalStorage();

    const filteredQuestions = assessmentSession?.questions?.filter(
      (question) => question.number !== payload.number,
    );
    const newQuestion = {
      id: payload.questionId,
      number: payload.number,
      selectedOptionId: payload.optionId,
    };
    const updatedQuestions: IQuestionLocalStorage[] = filteredQuestions
      ? [...filteredQuestions, newQuestion]
      : [newQuestion];
    const updatedProgress =
      updatedQuestions.length *
      (100 / (questions?.length > 0 ? questions?.length : 25));

    const updatedAssessmentLocalStorage: IAssessmentSessionLocalStorage = {
      currentPage: page,
      progress: updatedProgress,
      questions: updatedQuestions,
    };

    setLocalStorage(ASSESSMENT_SESSION_KEY, updatedAssessmentLocalStorage);
    setQuestions((prevItems) =>
      prevItems.map((item) =>
        item.id === payload.questionId
          ? {
              ...item,
              selectedOption: { id: payload.optionId, number: payload.number },
            }
          : item,
      ),
    );
    setCurrentQuestion((prev) => ({
      ...prev!,
      selectedOption: { id: payload.optionId, number: payload.number },
    }));
    setProgress(updatedProgress);
    setSelectedOptionIndex(null);
    setSelectedOptionId('');
  };

  const handlePagination = async (page: number) => {
    const assessmentSession = getAssessmentSessionFromLocalStorage();

    setLocalStorage(ASSESSMENT_SESSION_KEY, {
      ...assessmentSession,
      currentPage: page,
    });
    setPage(page);
    setCurrentQuestion(questions[page - 1]);
    setSelectedOptionIndex(null);
    scrollToTop();
  };

  useEffect(() => {
    const assessmentSession = getAssessmentSessionFromLocalStorage();

    if (assessmentSession) {
      setPage(assessmentSession.currentPage);
      setProgress(assessmentSession.progress);
    } else {
      setLocalStorage(ASSESSMENT_SESSION_KEY, {
        currentPage: 1,
        progress: 0,
        questions: [],
      } as IAssessmentSessionLocalStorage);
    }
  }, []);

  return (
    <AssessmentSessionContext.Provider
      value={{
        onTopOfScreen,
        setOnTopOfScreen,
        isLoading,
        setIsLoading,
        userAssessment,
        setUserAssessment,
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        selectedOptionIndex,
        setSelectedOptionIndex,
        selectedOptionId,
        setSelectedOptionId,
        page,
        setPage,
        progress,
        setProgress,
        getAssessmentSessionFromLocalStorage,
        handleSelectOption,
        handlePagination,
        isSessionOver,
        setIsSessionOver,
      }}
    >
      {children}
    </AssessmentSessionContext.Provider>
  );
};

const useAssessmentSessionContext = (): IAssessmentSessionContext => {
  const context = useContext(AssessmentSessionContext);
  if (context === undefined) {
    throw new Error(
      'useAssessmentSessionContext must be used within a AssessmentSessionProvider',
    );
  }
  return context;
};

export { AssessmentSessionProvider, useAssessmentSessionContext };
