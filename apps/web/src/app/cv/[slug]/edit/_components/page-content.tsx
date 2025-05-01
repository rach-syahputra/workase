'use client';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import AppLoading from '@/components/ui/app-loading';
import CvEditForm from './cv-edit-form';

const PageContent = () => {
  const { isLoading, cvData } = useCvEditFormContext();

  return isLoading && !cvData ? (
    <div className="bg-background fixed left-0 top-0 z-[100] flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Preparing your CV" />
    </div>
  ) : (
    <div className="grid w-full max-w-screen-xl grid-cols-2 gap-8">
      <CvEditForm />
    </div>
  );
};

export default PageContent;
