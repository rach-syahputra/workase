'use client';

import { useFormik } from 'formik';

import { AutoGenerateSummaryFormValues } from '@/lib/interfaces/form/cv';
import { IUserInformation } from '@/lib/cv-summary-generation';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { autoGenerateSummarySchema } from '@/validations/cv';
import FormInput from '@/components/ui/form-input';
import { Button } from '@/components/shadcn-ui/button';

interface AutoGenerateSummaryFormProps {
  setOpen: (open: boolean) => void;
  isLoading: boolean;
  onSubmit: (userInformation: IUserInformation) => void;
}

const AutoGenerateSummaryForm = ({
  setOpen,
  isLoading,
  onSubmit,
}: AutoGenerateSummaryFormProps) => {
  const { cvData, isComparingSummary } = useCvEditFormContext();

  const formik = useFormik<AutoGenerateSummaryFormValues>({
    initialValues: {},
    validationSchema: autoGenerateSummarySchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (_, { resetForm }) => {
      formik.setStatus('');
      resetForm();
    },
  });

  return (
    <form className="flex flex-1 flex-col justify-between gap-3">
      <div className="flex flex-col gap-6">
        <FormInput
          label="Soft Skills"
          placeholder="e.g. teamwork, communication, self-taught, problem-solving"
          type="text"
          name="softSkills"
          onChange={formik.handleChange}
          value={formik.values.softSkills || ''}
          errorMessage={formik.errors.softSkills}
        />
        <FormInput
          label={`Years of Experience in ${cvData?.data.header?.content.role ? cvData?.data.header?.content.role : 'Desired Role'}`}
          type="number"
          name="yearsOfExperience"
          onChange={formik.handleChange}
          value={formik.values.yearsOfExperience || 0}
          errorMessage={formik.errors.yearsOfExperience}
        />
        <FormInput
          label="Achievement"
          placeholder="e.g. increased sales by 20%, led a successful project, graduated with honors"
          type="text"
          name="achievement"
          onChange={formik.handleChange}
          value={formik.values.achievement || ''}
          errorMessage={formik.errors.achievement}
        />
        <FormInput
          label="Career Objective"
          placeholder="e.g. seeking to contribute to a forward-thinking team and grow professionally"
          type="text"
          name="careerObjective"
          onChange={formik.handleChange}
          value={formik.values.careerObjective || ''}
          errorMessage={formik.errors.careerObjective}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {formik.status && (
          <p className="text-center text-sm text-red-500">{formik.status}</p>
        )}
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading || isComparingSummary}
            onClick={() =>
              onSubmit({
                coreSkills: cvData?.data.skill?.contents || [],
                desiredRole: cvData?.data.header?.content.role || '',
                lastEducation: {
                  major: cvData?.data.education?.contents[0].major || '',
                  startYear:
                    cvData?.data.education?.contents[0].startDate || '',
                  graduationYear:
                    cvData?.data.education?.contents[0].endDate || '',
                },
                softSkills: formik.values.softSkills?.split(',') || [],
                yearsOfExperience: formik.values.yearsOfExperience,
                achievement: formik.values.achievement || '',
                careerObjective: formik.values.careerObjective || '',
              })
            }
            className="w-full"
          >
            {isLoading ? 'Generating CV Summary' : 'Generate CV Summary'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AutoGenerateSummaryForm;
