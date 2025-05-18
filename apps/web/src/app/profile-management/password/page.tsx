'use client';
import { Button } from '@/components/shadcn-ui/button';
import { axiosPublic } from '@/lib/axios';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import * as Yup from 'yup';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IResetPasswordForm } from '@/lib/interfaces/reset-password-form';
const ResetPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
  currentPassword: Yup.string()
    .required('password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .required('password is required')
    .min(8, 'Password must be at least 8 characters'), // password is required
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('please confirm your password'),
});

const roleUrl = {
  ADMIN: 'companies',
  USER: 'users',
};
export default function PasswordSettingsPage() {
  const { toast } = useToast();
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: session } = useSession();
  const initialValues: IResetPasswordForm = {
    currentPassword: '',
    newPassword: '',
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
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
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
          className="max-w-[1065px] md:w-[540px] md:px-[30px]"
        >
          <div className="flex w-full flex-col justify-center pt-[20px] md:pt-0">
            <div className="flex items-center">
              <div className="pb-[5px] pt-[13px] font-medium">
                Current Password
              </div>
              <div className="flex w-6 justify-center pb-[5px] pt-[13px] font-medium">
                <div className="relative flex justify-center">
                  <span
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="inline-flex cursor-help text-gray-500"
                  >
                    <Info size={14} />
                  </span>
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 transform rounded bg-gray-800 p-3 text-xs text-white shadow-lg">
                      <div className="mb-1 font-semibold">Attention:</div>
                      <ul className="list-disc space-y-1 pl-4">
                        <li>
                          user or company that use thirt-party service cannot
                          reset password
                        </li>
                      </ul>
                      <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-gray-800"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <input
              className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
              type="password"
              value={formik.values.currentPassword}
              name="currentPassword"
              onChange={formik.handleChange}
              id="currentPassword"
              onBlur={formik.handleBlur}
              placeholder=""
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm text-red-500">
                {formik.errors.newPassword}
              </p>
            )}
            <div className="pb-[5px] pt-[24px] font-medium">New Password</div>
            <input
              className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
              type="password"
              value={formik.values.newPassword}
              name="newPassword"
              onChange={formik.handleChange}
              id="newPassword"
              onBlur={formik.handleBlur}
              placeholder=""
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm text-red-500">
                {formik.errors.newPassword}
              </p>
            )}
            <div className="pb-[5px] pt-[24px] font-medium">
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
