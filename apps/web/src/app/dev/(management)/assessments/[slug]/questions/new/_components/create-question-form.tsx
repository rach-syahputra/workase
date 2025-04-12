'use client';

import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';

import { useAppToast } from '@/hooks/use-app-toast';
import { AddAssessmentQuestionFormValues } from '@/lib/interfaces/form/assessment';
import { addAssessmentQuestion } from '@/lib/apis/assessments';
import { addAssessmentQuestionSchema } from '@/validations/assessment';
import FormInput from '@/components/ui/form-input';
import TextareaFormInput from '@/components/ui/textarea-form-input';
import { Card } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import FormImageInput from '@/components/ui/form-image-input';
import IsCorrectFormInput from './is-correct-form-input';

interface CreateQuestionFormProps {
  assessmentId: string;
}

const CreateQuestionForm = ({ assessmentId }: CreateQuestionFormProps) => {
  const { appToast } = useAppToast();
  const [imagePreview, setImagePreview] = useState<string>('');

  const formik = useFormik<AddAssessmentQuestionFormValues>({
    initialValues: {
      assessmentId: assessmentId,
      question: '',
      image: null,
      options: [
        {
          text: '',
          isCorrect: 1,
        },
        {
          text: '',
          isCorrect: 0,
        },
        {
          text: '',
          isCorrect: 0,
        },
        {
          text: '',
          isCorrect: 0,
        },
      ],
    },
    validationSchema: addAssessmentQuestionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (
      values: AddAssessmentQuestionFormValues,
      { resetForm },
    ) => {
      formik.setStatus('');

      const response = await addAssessmentQuestion(values);

      if (response.success) {
        resetForm();
        setImagePreview('');

        appToast('SUCCESS', {
          title: 'Question Created',
          description:
            'Your assessment question has been created successfully.',
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

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setImagePreview(URL.createObjectURL(imageFile));

      formik.setFieldValue('image', imageFile);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Card className="flex flex-col gap-6 md:p-5">
        <TextareaFormInput
          label="Question"
          name="question"
          onChange={formik.handleChange}
          value={formik.values.question}
          errorMessage={formik.errors.question}
        />
        <FormImageInput
          label="Image"
          name="image"
          preview={imagePreview}
          onChange={updateImage}
          errorMessage={formik.errors.image}
        />
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold">Answer Options</span>
          <div className="flex flex-col gap-4">
            {formik.values.options.map((option, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-start gap-2"
              >
                <FormInput
                  label={`Option ${index + 1}`}
                  type="text"
                  name={`options[${index}].text`}
                  onChange={formik.handleChange}
                  value={option.text}
                  className="w-full"
                />
                <IsCorrectFormInput
                  name="correctOption"
                  onChange={() => {
                    const updated = formik.values.options.map((opt, i) => ({
                      ...opt,
                      isCorrect: i === index ? 1 : 0,
                    }));
                    formik.setFieldValue('options', updated);
                  }}
                  value={option.isCorrect}
                  checked={option.isCorrect === 1}
                />
              </div>
            ))}
            {formik.errors.options && (
              <p className="text-sm text-red-500">Options are required</p>
            )}
          </div>
        </div>

        {formik.status && (
          <p className="text-sm text-red-500">{formik.status}</p>
        )}
        <Button type="submit" disabled={formik.isSubmitting}>
          Create Question
        </Button>
      </Card>
    </form>
  );
};

export default CreateQuestionForm;
