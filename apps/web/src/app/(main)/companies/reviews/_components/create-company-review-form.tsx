'use client';

import { useFormik } from 'formik';

import { AddCompanyReview } from '@/lib/apis/company-reviews';
import { AddCompanyReviewFormValues } from '@/lib/interfaces/form/company-review';
import { useAppToast } from '@/hooks/use-app-toast';
import { addCompanyReviewSchema } from '@/validations/company-review';
import { Button } from '@/components/shadcn-ui/button';
import FormInput from '@/components/ui/form-input';
import RatingFormInput from '@/components/ui/rating-form-input';
import TextareaFormInput from '@/components/ui/textarea-form-input';
import DisabledFormInput from '@/components/ui/disabled-form-input.tsx';

interface CreateCompanyReviewFormProps {
  onOpenChange: (open: boolean) => void;
}

const CreateCompanyReviewForm = ({
  onOpenChange,
}: CreateCompanyReviewFormProps) => {
  const { appToast } = useAppToast();

  const formik = useFormik<AddCompanyReviewFormValues>({
    initialValues: {
      companyId: 'akame-cmp', // TO DO: retrieve companyId, companyName and jobTitle from user session or api
      title: '',
      salaryEstimate: 0,
      rating: {
        workCulture: 0,
        workLifeBalance: 0,
        facilities: 0,
        careerGrowth: 0,
      },
      content: '',
    },
    validationSchema: addCompanyReviewSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: AddCompanyReviewFormValues, { resetForm }) => {
      formik.setStatus('');

      const response = await AddCompanyReview(values);

      if (response.success) {
        resetForm();
        onOpenChange(false);

        appToast('SUCCESS', {
          title: 'Review Successfully Posted',
          description:
            'Your review has been posted successfully. Thank you for sharing your experience!',
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

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <DisabledFormInput
        label="Company Name"
        type="text"
        name="companyName"
        value="Akame ga Kill Studio"
      />
      <DisabledFormInput
        label="Job Title"
        type="text"
        name="jobTitle"
        value="Graphic Designer"
      />
      <FormInput
        label="Review Title"
        type="text"
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        errorMessage={formik.errors.title}
      />
      <FormInput
        label="Salary Estimate (Monthly)"
        type="text"
        name="salaryEstimate"
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^0-9]/g, '');
          const formattedValue = rawValue
            ? `$ ${parseInt(rawValue, 10).toLocaleString()}`
            : '';

          formik.setFieldValue(
            'salaryEstimate',
            rawValue ? parseInt(rawValue, 10) : '',
          );

          e.target.value = formattedValue;
        }}
        value={`$ ${formik.values.salaryEstimate.toLocaleString()}`}
        errorMessage={formik.errors.salaryEstimate}
      />
      <TextareaFormInput
        label="Content Review"
        name="content"
        rows={6}
        onChange={formik.handleChange}
        value={formik.values.content}
        errorMessage={formik.errors.content}
      />

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Ratings</h3>
        <div className="flex flex-col gap-4">
          <RatingFormInput
            label="Work Culture Rating"
            name="rating.workCulture"
            onChange={(value) =>
              formik.setFieldValue('rating.workCulture', value)
            }
            value={formik.values.rating.workCulture}
            errorMessage={formik.errors.rating?.workCulture}
          />
          <RatingFormInput
            label="Work-Life Balance"
            name="rating.workLifeBalance"
            onChange={(value) =>
              formik.setFieldValue('rating.workLifeBalance', value)
            }
            value={formik.values.rating.workLifeBalance}
            errorMessage={formik.errors.rating?.workLifeBalance}
          />
          <RatingFormInput
            label="Facilities"
            name="rating.facilities"
            onChange={(value) =>
              formik.setFieldValue('rating.facilities', value)
            }
            value={formik.values.rating.facilities}
            errorMessage={formik.errors.rating?.facilities}
          />
          <RatingFormInput
            label="Career Growth"
            name="rating.careerGrowth"
            onChange={(value) =>
              formik.setFieldValue('rating.careerGrowth', value)
            }
            value={formik.values.rating.careerGrowth}
            errorMessage={formik.errors.rating?.careerGrowth}
          />
        </div>
      </div>

      <p className="text-sm text-red-500">{formik.status}</p>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          onClick={() => onOpenChange(false)}
          variant="outline"
          disabled={formik.isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          Post
        </Button>
      </div>
    </form>
  );
};

export default CreateCompanyReviewForm;
