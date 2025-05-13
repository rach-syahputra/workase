// types-and-validation.ts
import * as Yup from 'yup';

export interface DialogApplyJobProps {
  jobId: string;
  className?: string;
  variant?: string;
}

export interface ApplicationFormValues {
  expectedSalary: string;
  cv: File | null;
}

export const ApplicationSchema = Yup.object().shape({
  expectedSalary: Yup.string().required('Expected salary is required'),
  cv: Yup.mixed()
    .required('CV is required')
    .test(
      'fileType',
      'Only PDF files are allowed',
      (value) => value instanceof File && value.type === 'application/pdf',
    )
    .test(
      'fileSize',
      'Max file size is 2MB',
      (value) => value instanceof File && value.size <= 2048000,
    ),
});
