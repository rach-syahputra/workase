'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IDeveloperAssessmentContext {
  currentAssessmentSkill: string;
  setCurrentAssessmentSkill: Dispatch<SetStateAction<string>>;
}

const DeveloperAssessmentContext = createContext<
  IDeveloperAssessmentContext | undefined
>(undefined);

const DeveloperAssessmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentAssessmentSkill, setCurrentAssessmentSkill] =
    useState<string>('');

  return (
    <DeveloperAssessmentContext.Provider
      value={{
        currentAssessmentSkill,
        setCurrentAssessmentSkill,
      }}
    >
      {children}
    </DeveloperAssessmentContext.Provider>
  );
};

const useDeveloperAssessmentContext = (): IDeveloperAssessmentContext => {
  const context = useContext(DeveloperAssessmentContext);
  if (context === undefined) {
    throw new Error(
      'useDeveloperAssessmentContext must be used within a DeveloperAssessmentProvider',
    );
  }
  return context;
};

export { DeveloperAssessmentProvider, useDeveloperAssessmentContext };
