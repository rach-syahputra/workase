'use client';
import * as React from 'react';
import { Button } from '@/components/shadcn-ui/button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { axiosPublic } from '@/lib/axios';
import { Building2 } from 'lucide-react';
export interface IForgotPasswordProps {}
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(), // email is required
});

interface IForgotPasswordForm {
  email: string;
}

export default function ForgotPassword(props: IForgotPasswordProps) {
  const initialValues: IForgotPasswordForm = {
    email: '',
  };

  const submitForgotPassword = async (values: IForgotPasswordForm) => {
    try {
      const response = await axiosPublic.post(
        '/companies/password-reset-request',
        {
          email: values.email,
        },
      );
      if (response.status == 200) {
        alert('Link reset passsword has been send successfully to your email');
      }
    } catch (err) {
      alert(
        `something went wrong, maybe your email is already registered by third party or not registered`,
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      submitForgotPassword(values);
    },
  });

  return (
    <div className="font-geist md:w-[500px]">
      <div className="flex flex-col justify-center p-1 pb-2">
        <div className="flex items-center justify-center gap-3 p-3 text-center text-[26px] font-medium">
          {' '}
          <Building2 className="w-4 scale-150" />
          Forgot Password Form
        </div>
        <div className="flex justify-center text-center md:pt-[10px]">
          Enter your company email address and we`ll send you a link to reset
          your password
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="pb-[5px] pt-[10px] font-medium md:pt-[35px]">
            Email address
          </div>
          <input
            className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
            type="text"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            id="email"
            onBlur={formik.handleBlur}
            placeholder="Email Address"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
          <div className="w-full pt-[20px]">
            <Button
              className="bg-primary-blue text-light my-auto h-[45px] w-full items-center justify-center rounded-lg text-[17px] font-medium text-white"
              type="submit"
            >
              Send
            </Button>
          </div>
        </form>
        <div className="flex w-full items-center justify-center pt-[14px]">
          <a
            className="pb-[15px] pt-[5px] text-[15px] text-blue-700"
            href="/companies/login"
          >
            {' '}
            Back to sign in
          </a>
        </div>
      </div>
    </div>
  );
}
