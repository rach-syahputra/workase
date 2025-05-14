'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ISampleContext {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const SampleContext = createContext<ISampleContext | undefined>(undefined);

const SampleProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <SampleContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
};

const useSampleContext = (): ISampleContext => {
  const context = useContext(SampleContext);
  if (context === undefined) {
    throw new Error('useSampleContext must be used within a SampleProvider');
  }
  return context;
};

export { SampleProvider, useSampleContext };
