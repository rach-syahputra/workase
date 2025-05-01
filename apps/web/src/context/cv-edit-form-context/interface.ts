import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';

import { ICv } from '@/lib/interfaces/cv';
import { AddCvFormValues } from '@/lib/interfaces/form/cv';

export interface ICvEditFormContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  cvData: ICv | undefined;
  setCvData: Dispatch<SetStateAction<ICv | undefined>>;
  formik: ReturnType<typeof useFormik<AddCvFormValues>>;
}
