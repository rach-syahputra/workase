'use client';

import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';

import { useAppToast } from '@/hooks/use-app-toast';
import { AddAssessmentFormValues } from '@/lib/interfaces/form/assessment';
import { addAssessment } from '@/lib/apis/assessments';
import { addAssessmentSchema } from '@/validations/assessment';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { useAssessmentContext } from '@/context/assessment-context/index';
import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import DisabledFormInput from '@/components/ui/disabled-form-input.tsx';
import FormInput from '@/components/ui/form-input';
import { Button } from '@/components/shadcn-ui/button';
import FormImageInput from '@/components/ui/form-image-input';
import TextareaFormInput from '@/components/ui/textarea-form-input';

interface CreateAssessmentFormProps {
  onOpenChange: (open: boolean) => void;
}

const CreateAssessmentForm = ({ onOpenChange }: CreateAssessmentFormProps) => {
  const { selectedSkill, fetchAvailableSkills } = useCreateAssessmentContext();
  const { fetchGetAssessments } = useAssessmentContext();
  const { fetchSkills } = useBrowseSkillsContext();
  const { appToast } = useAppToast();
  const [imagePreview, setImagePreview] = useState<string>('');

  const formik = useFormik<AddAssessmentFormValues>({
    initialValues: {
      skillId: selectedSkill.id,
      image: null,
      shortDescription: '',
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
          description: `${response.data?.assessment.skill.title} assessment has been created successfully.`,
          variant: 'default',
        });

        onOpenChange(false);
        fetchAvailableSkills();
        fetchGetAssessments();
        fetchSkills();
      } else {
        if (response.code === 'ERR_NETWORK') {
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
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-1 flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-6">
        <DisabledFormInput
          type="text"
          label="Skill"
          name="skillName"
          value={selectedSkill.title}
        />
        <FormInput
          label="Skill ID"
          type="text"
          name="skillId"
          onChange={formik.handleChange}
          value={formik.values.skillId}
          className="sr-only"
        />
        <FormImageInput
          label="Image"
          name="image"
          onChange={updateImage}
          preview={imagePreview}
          description="Best result with 1:1 ratio, #e6e6e6 color and solid image"
          errorMessage={formik.errors.image}
        />
        <TextareaFormInput
          label="Short Description"
          name="shortDescription"
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.shortDescription}
          errorMessage={formik.errors.shortDescription}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {formik.errors.skillId && (
          <p className="text-center text-sm text-red-500">
            {formik.errors.skillId}
          </p>
        )}
        {formik.status && (
          <p className="text-center text-sm text-red-500">{formik.status}</p>
        )}
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          Create Assessment
        </Button>
      </div>
    </form>
  );
};

export default CreateAssessmentForm;
