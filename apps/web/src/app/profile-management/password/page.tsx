'use client';
import { auth } from '@/auth';
import { Button } from '@/components/shadcn-ui/button';
import { axiosPublic } from '@/lib/axios';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import * as Yup from 'yup';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('password is required')
    .min(8, 'Password must be at least 8 characters'), // password is required
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('please confirm your password'),
});

interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}
const roleUrl = {
  ADMIN: 'companies',
  USER: 'users',
};
export default function PasswordSettingsPage() {
  const { toast } = useToast();
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: session } = useSession();
  const initialValues: IResetPasswordForm = {
    password: '',
    confirmPassword: '',
  };

  const submitResetPassword = async (values: IResetPasswordForm) => {
    try {
      if (session?.user?.authProvider === 'GOOGLE') {
        toast({
          title: 'Error',
          description:
            'user or company that use thirt-party service cannot reset password',
          variant: 'destructive',
        });
        return;
      }
      const response = await axiosPublic.patch(
        `/${roleUrl[session?.user?.role as keyof typeof roleUrl]}`,
        {
          password: values.password,
          authProvider: session?.user?.authProvider,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );
      if (response.status >= 200 && response.status < 300) {
        toast({
          title: 'Success',
          description: 'Update Success',
          variant: 'default',
        });
      }
      if (response.status >= 300) {
        toast({
          title: 'Error',
          description: 'Update Failed: Please try again.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Reset password failed, please try again',
        variant: 'destructive',
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      submitResetPassword(values);
    },
  });

  return (
    <div className="w-full py-5 md:px-4 md:py-8">
      <div className="flex justify-center text-[24px] font-medium md:justify-normal">
        Password
      </div>
      <div className="my-4 w-full rounded-md border bg-white px-4 pb-[30px] md:py-4 md:pb-[30px]">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="max-w-[1065px] md:px-[30px]"
        >
          <div className="flex w-full flex-col justify-center pt-[20px] md:pt-0">
            <div className="flex items-center">
              <div className="pb-[5px] pt-[13px] font-medium">New Password</div>
              <div className="flex w-6 justify-center pb-[5px] pt-[13px] font-medium">
                <div className="relative flex justify-center">
                  <span
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="inline-flex text-gray-500 cursor-help"
                  >
                    <Info size={14} />
                  </span>
                  {showTooltip && (
                    <div className="absolute z-10 w-64 p-3 mb-2 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded shadow-lg bottom-full left-1/2">
                      <div className="mb-1 font-semibold">Attention:</div>
                      <ul className="pl-4 space-y-1 list-disc">
                        <li>
                          user or company that use thirt-party service cannot
                          reset password
                        </li>
                      </ul>
                      <div className="absolute bottom-0 w-2 h-2 transform rotate-45 -translate-x-1/2 translate-y-1/2 bg-gray-800 left-1/2"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <input
              className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
              type="password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              id="password"
              onBlur={formik.handleBlur}
              placeholder=""
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
            <div className="pb-[5px] pt-[13px] font-medium">
              Confirm New Password
            </div>
            <input
              className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
              type="password"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              onChange={formik.handleChange}
              id="confirmPassword"
              onBlur={formik.handleBlur}
              placeholder=""
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
            <div className="right-0 flex justify-end pt-[20px]">
              <Button
                className="bg-primary-blue right-0 h-10 w-full cursor-pointer rounded-md px-8 pt-[-2px] text-center text-[15px] font-semibold md:w-fit"
                type="submit"
              >
                Reset Password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
