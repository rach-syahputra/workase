'use client';

import { useEffect } from 'react';
import { useFormik } from 'formik';

import { useAppToast } from '@/hooks/use-app-toast';
import { AddAssessmentFormValues } from '@/lib/interfaces/form/assessment';
import { addAssessment } from '@/lib/apis/assessments';
import { addAssessmentSchema } from '@/validations/assessment';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import Skills from './skills';

const CreateAssessmentForm = () => {
  const { isLoading, setIsSubmitting, skills, selectedSkillId } =
    useCreateAssessmentContext();
  const { appToast } = useAppToast();

  const formik = useFormik<AddAssessmentFormValues>({
    initialValues: {
      skillId: '',
    },
    validationSchema: addAssessmentSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: AddAssessmentFormValues, { resetForm }) => {
      formik.setStatus('');

      const response = await addAssessment(values);

      if (response.success) {
        appToast('SUCCESS', {
          title: 'Assessment Successfully Created',
          description: 'New assessment has been created successfully.',
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
    if (selectedSkillId) {
      formik.setFieldValue('skillId', selectedSkillId);
    }
  }, [selectedSkillId]);

  useEffect(() => {
    if (formik.values.skillId) {
      formik.submitForm();
    }
  }, [formik.values.skillId]);

  useEffect(() => {
    setIsSubmitting(formik.isSubmitting);
  }, [formik.isSubmitting]);

  return (
    <div className="flex w-full flex-col gap-3">
      <Skills skills={skills} isLoading={isLoading} className="mt-3" />
      {formik.errors.skillId && (
        <p className="text-sm text-red-500">{formik.errors.skillId}</p>
      )}
    </div>
  );
};

export default CreateAssessmentForm;
