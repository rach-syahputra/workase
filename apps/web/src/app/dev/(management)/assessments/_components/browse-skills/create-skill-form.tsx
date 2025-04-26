'use client';

import { useFormik } from 'formik';

import { addSkill } from '@/lib/apis/skill';
import { AddSkillFormValues } from '@/lib/interfaces/form/skill';
import { addSkillSchema } from '@/validations/skill';
import { useAppToast } from '@/hooks/use-app-toast';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { useAssessmentContext } from '@/context/assessment-context';
import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import FormInput from '@/components/ui/form-input';
import { Button } from '@/components/shadcn-ui/button';

interface CreateSkillFormProps {
  onOpenChange: (open: boolean) => void;
}

const CreateSkillForm = ({ onOpenChange }: CreateSkillFormProps) => {
  const { fetchAvailableSkills } = useCreateAssessmentContext();
  const { fetchGetAssessments } = useAssessmentContext();
  const { fetchSkills } = useBrowseSkillsContext();
  const { appToast } = useAppToast();

  const formik = useFormik<AddSkillFormValues>({
    initialValues: {
      title: '',
    },
    validationSchema: addSkillSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: AddSkillFormValues, { resetForm }) => {
      formik.setStatus('');

      const response = await addSkill(values);

      if (response.success) {
        appToast('SUCCESS', {
          title: 'Skill Successfully Created',
          description: `${response.data?.skill.title} skill has been created successfully.`,
          variant: 'default',
        });

        onOpenChange(false);
        fetchSkills();
        fetchAvailableSkills();
        fetchGetAssessments();
        resetForm();
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-1 flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-6">
        <FormInput
          label="Title"
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {formik.status && (
          <p className="text-center text-sm text-red-500">{formik.status}</p>
        )}
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          Create Skill
        </Button>
      </div>
    </form>
  );
};

export default CreateSkillForm;
