'use client';
import * as React from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { IoPerson } from 'react-icons/io5';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { axiosPublic } from '@/lib/axios';
export interface IResetPasswordProps {
  params: any;
}
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

export default function ResetPassword(props: IResetPasswordProps) {
  const initialValues: IResetPasswordForm = {
    password: '',
    confirmPassword: '',
  };

  const submitResetPassword = async (values: IResetPasswordForm) => {
    try {
      const response = await axiosPublic.patch(
        '/users/reset-password',
        {
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${props.params.token}`,
          },
        },
      );
      if (response.status == 200) {
        alert('Your password has been updated successfully');
      }
    } catch (err) {
      alert(
        `something went wrong, maybe your password reset link has been reach its limit time or you have used one chance we have give to reset your password, please try request new password reset link again`,
      );
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
    <div className="font-geist md:w-[500px]">
      <div className="flex flex-col justify-center p-1 pb-2">
        <div className="flex items-center justify-center gap-3 p-3 text-center text-[26px] font-medium">
          {' '}
          <IoPerson className="w-4 scale-150" />
          Reset Password Form
        </div>
        <div className="flex justify-center text-center md:pt-[10px]">
          Enter Your New Personal Account Password to Continue, After That You
          Can Sign In Again
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="pb-[5px] pt-[10px] font-medium md:pt-[30px]"></div>
          <input
            className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
            type="password"
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            id="password"
            onBlur={formik.handleBlur}
            placeholder="New Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
          <div className="pb-[5px] pt-[10px] font-medium"></div>
          <input
            className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
            type="password"
            value={formik.values.confirmPassword}
            name="confirmPassword"
            onChange={formik.handleChange}
            id="confirmPassword"
            onBlur={formik.handleBlur}
            placeholder="Confirm Password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {formik.errors.confirmPassword}
            </p>
          )}
          <div className="w-full pt-[20px]">
            <Button
              className="bg-primary-blue text-light my-auto h-[45px] w-full items-center justify-center rounded-lg text-[17px] font-medium text-white"
              type="submit"
            >
              Reset Password
            </Button>
          </div>
        </form>
        <div className="flex w-full items-center justify-center pt-[14px] text-[15px]">
          <div className="flex items-center justify-center gap-1 pb-[15px] pt-[5px] text-[15px] text-blue-700">
            <div className="text-[15px] text-black">
              Remember Your Password?{' '}
            </div>{' '}
            <a href="/users/login" className="py-2">
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
