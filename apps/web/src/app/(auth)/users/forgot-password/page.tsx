'use client';
import * as React from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { IoPerson } from 'react-icons/io5';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { axiosPublic } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
export interface IForgotPasswordProps {}
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(), // email is required
});

interface IForgotPasswordForm {
  email: string;
}

export default function ForgotPassword(props: IForgotPasswordProps) {
  const { toast } = useToast();
  const initialValues: IForgotPasswordForm = {
    email: '',
  };

  const submitForgotPassword = async (values: IForgotPasswordForm) => {
    try {
      const response = await axiosPublic.post('/users/password-reset-request', {
        email: values.email,
      });
      if (response.status == 200) {
        toast({
          title: 'Success',
          description:
            'Link reset passsword has been send successfully to your email',
          variant: 'default',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: `something went wrong, maybe your email is already registered by third party or not registered`,
        variant: 'destructive',
      });
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
      <div className="flex w-full justify-center">
        <div className="w-[420px]">
          <div className="flex flex-col justify-center p-1 pb-2">
            <div className="flex items-center justify-center gap-3 p-3 text-center text-[23.1px] font-medium sm:text-[26px]">
              {' '}
              <IoPerson className="w-4 scale-110" />
              Forgot Password Form
            </div>
            <div className="flex justify-center text-center text-[16px] md:pt-[10px]">
              Enter Your Personal Email Address and We`ll Send You a Link to
              Reset Your Password
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="pb-[5px] pt-[13px] font-medium md:pt-[35px]">
                Email Address
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
                href="/users/login"
              >
                {' '}
                Back to Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
