/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/shadcn-ui/button';
import Logo from '@/components/ui/logo-for-auth';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import * as Yup from 'yup';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(), // email is required
  password: Yup.string().required(), // password is required
});

interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginProps {}
const signUpItem = ['user', 'company'];
export default function Login(props: ILoginProps) {
  const initialValues: ILoginForm = {
    email: '',
    password: '',
  };

  const submitLogin = async (values: ILoginForm) => {
    try {
      const response2 = await signIn('company-login', {
        email: values.email,
        password: values.password, // password is requiredvalues.password,
        redirect: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      submitLogin(values);
    },
  });

  return (
    <div className="font-geist mt-[-10px] md:w-[650px]">
      {' '}
      <div className="flex flex-col items-center justify-center pb-2">
        <div className="pb-2 text-[32px] font-semibold md:text-[36px]">
          Sign in to Workase
        </div>{' '}
        <div className="text-[18px] font-light md:text-[21px]">
          Log in to your company account today.
        </div>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="py-[10px] font-medium">Email Address</div>
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
        <h2 className="py-[10px] font-medium">Password</h2>
        <input
          className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
          type="password"
          value={formik.values.password}
          name="password"
          onChange={formik.handleChange}
          id="password"
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        <div className="pt-[20px]">
          <Button
            className="bg-primary-blue text-light my-auto h-[45px] w-full items-center justify-center rounded-lg text-[17px] font-medium text-white"
            type="submit"
          >
            Sign in
          </Button>
        </div>
      </form>
      <div className="flex w-full items-center justify-center pt-[14px]">
        <a
          className="text-primary-blue pt-[5px] text-[15px]"
          href="/forgotPass"
        >
          {' '}
          Forgot password?
        </a>
      </div>
      <div className="flex items-center py-2">
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="px-3 text-[18px] text-gray-500">or</div>
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>
      <button className="flex h-[45px] w-full items-center rounded-lg border-[1px] border-gray-300 bg-white">
        <div className="relative flex w-full items-center justify-center">
          <img
            src="/Google.svg"
            alt="Google Logo"
            className="absolute left-8 h-5 sm:static sm:px-3"
          />
          <center className="font-medium">Continue With Google</center>
        </div>
      </button>
      <div className="mt-4 flex gap-2 md:mt-5">
        {signUpItem.map((item) => (
          <button
            key={item}
            className="flex h-[45px] w-full items-center rounded-lg border-[1px] border-gray-300 bg-white"
          >
            <div className="relative flex w-full items-center justify-center">
              <center
                className={`${item == 'user' ? 'text-primary-blue' : 'text-[#9A6713]'} font-light`}
              >
                Sign up as {item}
              </center>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
