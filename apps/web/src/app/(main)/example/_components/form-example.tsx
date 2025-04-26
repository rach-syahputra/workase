'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { GetSampleByEmail } from '@/lib/apis/sample';
import { GetSampleResponse } from '@/lib/interfaces/api-response/sample';
import { useSampleContext } from '@/context/sample-context';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import FormInput from '@/components/ui/form-input';
import AppLoading from '@/components/ui/app-loading';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const FormExample = () => {
  const { email, setEmail } = useSampleContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues, { resetForm }) => {
      formik.setStatus('');

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = (await GetSampleByEmail({
        email: values.email,
      })) as GetSampleResponse;

      if (response.success) {
        setEmail(response.data.email);
      } else {
        formik.setStatus('Login failed');
        setEmail('');
      }
    },
  });

  return (
    <>
      <Card className="p-5">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <h2 className="heading-3">Login</h2>
          <FormInput
            label="Email"
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={formik.errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            errorMessage={formik.errors.password}
          />
          <p className="text-sm text-red-500">{formik.status}</p>
          <Button type="submit" disabled={formik.isSubmitting}>
            Submit
          </Button>
        </form>
      </Card>
      <div className="flex items-center justify-center gap-6">
        {formik.isSubmitting ? (
          <AppLoading size="sm" label="Submitting" />
        ) : (
          <p>{email}</p>
        )}
      </div>
    </>
  );
};

export default FormExample;
