'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import { addCompanyReview } from '@/lib/apis/company-reviews';
import { AddCompanyReviewFormValues } from '@/lib/interfaces/form/company-review';
import { addCompanyReviewSchema } from '@/validations/company-review';
import { useAppToast } from '@/hooks/use-app-toast';
import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import { Button } from '@/components/shadcn-ui/button';
import FormInput from '@/components/ui/form-input';
import { Label } from '@/components/shadcn-ui/label';
import RatingFormInput from '@/components/ui/rating-form-input';
import TextareaFormInput from '@/components/ui/textarea-form-input';
import DisabledFormInput from '@/components/ui/disabled-form-input.tsx';
import CompanyNameSelect from './company-name-select';

const CreateCompanyReviewForm = () => {
  const router = useRouter();
  const { appToast } = useAppToast();
  const { fetchCompaniesReviews, firstRenderRef, userCurrentCompanies } =
    useCompaniesReviewsContext();
  const [jobTitle, setJobTitle] = useState<string>('-');

  const formik = useFormik<AddCompanyReviewFormValues>({
    initialValues: {
      companyId: userCurrentCompanies[0]?.id || '',
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

      const response = await addCompanyReview(values);

      if (response.success) {
        resetForm();
        firstRenderRef.current = false;
        fetchCompaniesReviews();
        router.push('/company-reviews');

        appToast('SUCCESS', {
          title: 'Review Successfully Posted',
          description:
            'Your review has been posted successfully. Thank you for sharing your experience!',
          variant: 'default',
        });
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

  useEffect(() => {
    setJobTitle(userCurrentCompanies[0]?.jobTitle || '-');
  }, [userCurrentCompanies]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-5">
      <div className="mb-4">
        <h1 className="heading-2 text-xl">Post Review</h1>
        <p className="text-primary-gray text-sm">
          Share your professional experience to guide job seekers in their
          decisions.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Company Name</Label>
        <CompanyNameSelect formik={formik} setJobTitle={setJobTitle} />
      </div>
      <DisabledFormInput
        label="Job Title"
        type="text"
        name="jobTitle"
        value={jobTitle}
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
        label="Review Content"
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

      <Button type="submit" disabled={formik.isSubmitting}>
        Post
      </Button>
    </form>
  );
};

export default CreateCompanyReviewForm;
