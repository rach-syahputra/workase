/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/shadcn-ui/button';
import { axiosPublic } from '@/lib/axios';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { UserRound } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import { IoPerson } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(), // email is required
  password: Yup.string()
    .required()
    .min(8, 'Password must be at least 8 characters'), // password is required
});

interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginProps {}
const signUpItem = ['User', 'Company'];
export default function Login(props: ILoginProps) {
  const router = useRouter(); // Initialize router
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('redirect');
  const message = searchParams.get('message');
  const initialValues: ILoginForm = {
    email: '',
    password: '',
  };

  const submitLogin = async (values: ILoginForm) => {
    const response = await signIn('user-login', {
      email: values.email,
      password: values.password, // password is requiredvalues.password,
      redirect: false,
      callbackUrl: callbackUrl || '/', // Redirect to the specified URL after login
    });

    if (response?.error) {
      console.log('LOGIN FAILED:', response.error);
      alert('Login failed: Email or password was wrong');
    } else {
      router.push(callbackUrl || '/'); // ← Selalu pakai redirect param
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      submitLogin(values);
    },
  });
  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);
  return (
    <div className="font-geist mt-[-10px] md:w-[650px]">
      <div className="flex flex-col items-center justify-center pb-2">
        <div className="flex items-center gap-3 pb-2 text-[32px] font-semibold md:text-[36px]">
          <IoPerson className="w-5 scale-150" />
          Sign In to Workase
        </div>{' '}
        <div className="text-[18px] font-light md:text-[21px]">
          Log In to Your Personal Account Today.
        </div>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="pb-[5px] pt-[13px] font-medium">Email Address</div>
        <input
          className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
          type="text"
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          id="email"
          onBlur={formik.handleBlur}
          placeholder="E.g. Andrew@mail.com"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}
        <h2 className="pb-[5px] pt-[13px] font-medium">Password</h2>
        <input
          className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
          type="password"
          value={formik.values.password}
          name="password"
          onChange={formik.handleChange}
          id="password"
          onBlur={formik.handleBlur}
          placeholder="E.g. AndrewP@ssw0rd"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        )}
        <div className="pt-[20px]">
          <Button
            className="bg-primary-blue text-light my-auto h-[45px] w-full items-center justify-center rounded-lg text-[17px] font-medium text-white"
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </form>
      <div className="flex w-full items-center justify-center pt-[14px]">
        <a
          className="text-primary-blue pt-[5px] text-[15px]"
          href="/users/forgot-password"
        >
          {' '}
          Forgot Password?
        </a>
      </div>
      <div className="flex items-center py-2">
        <div className="h-[1px] w-full bg-gray-300"></div>
        <div className="px-3 text-[18px] text-gray-500">or</div>
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>
      <button
        className="flex h-[45px] w-full items-center rounded-lg border-[1px] border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => signIn('google-user')}
      >
        <div className="relative flex w-full items-center justify-center">
          <img
            src="/Google.svg"
            alt="google"
            className="absolute left-6 h-5 sm:static sm:px-3"
          />
          <center className="font-medium">Continue with Google</center>
        </div>
      </button>
      <div className="mt-4 flex gap-2 md:mt-5">
        {signUpItem.map((item) => (
          <Link
            key={item}
            href={`/${item == 'User' ? 'users' : 'companies'}/register`}
            className="flex h-[45px] w-full items-center rounded-lg border-[1px] border-gray-300 bg-white hover:bg-gray-50"
          >
            <button className="relative flex w-full items-center justify-center">
              <center
                className={`${item == 'User' ? 'text-primary-blue' : 'text-[#9A6713]'} font-light`}
              >
                Sign Up as {item}
              </center>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
