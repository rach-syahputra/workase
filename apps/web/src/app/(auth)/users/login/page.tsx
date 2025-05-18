'use client';
import { Button } from '@/components/shadcn-ui/button';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import { IoPerson } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import AppLoading from '@/components/ui/app-loading';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useUserStatsContext } from '@/context/user-stats-context';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(8, 'Password must be at least 8 characters'),
});

interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginProps {}
const signUpItem = ['User', 'Company'];
export default function Login(props: ILoginProps) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('redirect') || '/';
  const message = searchParams.get('message');
  const { setUpdate } = useUserStatsContext();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialValues: ILoginForm = {
    email: '',
    password: '',
  };

  const handleGoogleSignIn = () => {
    signIn('google-user', {
      callbackUrl: callbackUrl || '/',
    });
  };

  const submitLogin = async (values: ILoginForm) => {
    setIsLogin(true);
    const response = await signIn('user-login', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: callbackUrl || '/',
    });
    if (response?.error) {
      toast({
        title: 'Error',
        description: 'Login failed: Email or password was wrong',
        variant: 'destructive',
      });
      setIsLogin(false);
    } else {
      setUpdate(true);
      router.push(callbackUrl || '/');
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
      toast({ description: message });
    }
  }, [message, toast]);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);
  return loading ? (
    <div className="bg-background fixed left-0 top-0 flex min-h-screen w-screen flex-1 items-center justify-center">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <div className="font-geist mt-[-10px] flex-col items-center justify-center md:w-[650px]">
      <div className="flex w-full justify-center">
        <div className="w-[420px]">
          <div className="flex flex-col items-center justify-center pb-2">
            <div className="flex items-center gap-3 pb-2 text-[24px] font-semibold">
              <IoPerson className="w-5 scale-110" />
              Sign In to Workase
            </div>{' '}
            <div className="text-[16px] font-light">
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
                disabled={isLogin}
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
            onClick={handleGoogleSignIn}
          >
            <div className="relative flex w-full items-center justify-center">
              <Image
                width={50}
                height={10}
                src="/Google.svg"
                alt="Google Logo"
                className="absolute left-6 h-4 sm:static sm:px-3"
              />
              <center className="font-medium">Continue with Google</center>
            </div>
          </button>
          <div className="mt-4 flex gap-2 md:mt-5">
            {signUpItem.map((item) => (
              <Link
                key={item}
                href={`/${item == 'User' ? 'users' : 'companies'}/register?redirect=${encodeURIComponent(callbackUrl)}`}
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
      </div>
    </div>
  );
}
