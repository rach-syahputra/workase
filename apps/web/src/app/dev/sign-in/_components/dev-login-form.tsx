'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { DeveloperLoginFormValues } from '@/lib/interfaces/form/developer';
import { developerLoginSchema } from '@/validations/developer';
import FormInput from '@/components/ui/form-input';
import { Button } from '@/components/shadcn-ui/button';

const DevLoginForm = () => {
  const router = useRouter();

  const formik = useFormik<DeveloperLoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: developerLoginSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: DeveloperLoginFormValues) => {
      formik.setStatus('');

      const response = await signIn('developer-login', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/dev/assessments');
      } else {
        formik.setStatus('Email or Password is incorrect.');
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-full w-full flex-1 flex-col items-center justify-between gap-4"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="heading-2">Welcome Back</h1>
        <p className="text-primary-gray text-center text-sm">
          Sign in as a developer and manage your app.
        </p>
      </div>

      <div className="flex w-full flex-col gap-6">
        <FormInput
          label="Email"
          type="email"
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
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {formik.status && (
          <p className="text-center text-sm text-red-500">{formik.status}</p>
        )}
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
    </form>
  );
};

export default DevLoginForm;
