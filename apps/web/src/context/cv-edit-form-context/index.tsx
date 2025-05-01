'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { getCvBySlug, updateCv } from '@/lib/apis/cv';
import { ICv } from '@/lib/interfaces/cv';
import { AddCvFormValues } from '@/lib/interfaces/form/cv';
import { ICvEditFormContext } from './interface';
import { addCvSchema } from '@/validations/cv';
import { useAppToast } from '@/hooks/use-app-toast';

const CvEditFormContext = createContext<ICvEditFormContext | undefined>(
  undefined,
);

const CvEditFormProvider = ({
  cv,
  children,
}: {
  cv: ICv;
  children: React.ReactNode;
}) => {
  const { appToast } = useAppToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [cvData, setCvData] = useState<ICv>();

  const fetchGetCvBySlug = async () => {
    setIsLoading(true);

    const response = await getCvBySlug({ slug: cv.slug });

    if (response.success) {
      setCvData(response.data?.cv);
    }

    setIsLoading(false);
  };

  const formik = useFormik<AddCvFormValues>({
    initialValues: {
      data: cvData?.data || cv?.data,
    },
    validationSchema: addCvSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: AddCvFormValues, { resetForm }) => {
      formik.setStatus('');

      console.log('values:', values);

      const response = await updateCv({ cvId: cv.id, data: values.data });

      if (response.success) {
        await fetchGetCvBySlug();
        resetForm({ values });

        appToast('SUCCESS', {
          title: 'CV Saved',
          description: 'Your CV has been saved successfully.',
          variant: 'default',
        });
      } else {
        if (response.code === 'ERR_NETWORK') {
          // TO DO: add toast action to redirect to the login page
          appToast('ERROR_NETWORK');
        } else if (response.code === 'ERR_UNAUTHENTICATED') {
          appToast('ERROR_UNAUTHENTICATED');
        } else if (response.code === 'ERR_UNAUTHORIZED') {
          appToast('ERROR_UNAUTHORIZED');
        } else {
          formik.setStatus(response.error?.message);
        }
      }
    },
  });

  useEffect(() => {
    if (cv) {
      setCvData(cv);
    }
  }, [cv]);

  useEffect(() => {
    console.log('formik values', formik.values);

    setCvData((prev) => ({
      ...prev!,
      data: formik.values.data,
    }));
  }, [formik.values]);

  useEffect(() => {
    console.log('formik errors', formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    console.log('formik ');
  }, [formik.status]);

  return (
    <CvEditFormContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showPreview,
        setShowPreview,
        cvData,
        setCvData,
        formik,
      }}
    >
      {children}
    </CvEditFormContext.Provider>
  );
};

const useCvEditFormContext = (): ICvEditFormContext => {
  const context = useContext(CvEditFormContext);
  if (context === undefined) {
    throw new Error(
      'useCvEditFormContext must be used within a CvEditFormProvider',
    );
  }
  return context;
};

export { CvEditFormProvider, useCvEditFormContext };
