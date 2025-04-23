/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/shadcn-ui/button';
import Logo from '@/components/ui/logo-for-auth';
import { axiosPublic } from '@/lib/axios';
import { useFormik } from 'formik';
import { Building2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(8, 'Password must be at least 8 characters'),
  phoneNumber: Yup.string()
    .required()
    .min(8, 'phone number must be at least 8 characters')
    .max(15, 'phone number must be at most 15 characters')
    .matches(/^[0-9\s]+$/, 'Invalid phone number format'),
});

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const signInItem = ['User', 'Company'];
export default function Register() {
  const router = useRouter();
  const initialValues: IRegisterForm = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  };

  const submitRegister = async (values: IRegisterForm) => {
    try {
      const response = await axiosPublic.post('/auth/register/company', {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        authProvider: 'EMAIL',
      });
      if (response.status == 201) {
        router.push('/companies/login');
      }
    } catch (err) {
      alert(`something went wrong, maybe your email is already registered`);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      submitRegister(values);
    },
  });

  return (
    <div className="font-geist mt-[-10px] md:w-[650px]">
      {' '}
      <div className="flex flex-col items-center justify-center pb-2">
        <div className="flex items-center gap-3 pb-2 text-[32px] font-semibold md:text-[36px]">
          <Building2 className="scale-125" /> Sign Up to Workase
        </div>{' '}
        <div className="text-[18px] font-light md:text-[21px]">
          Create Your Company Account Today.
        </div>
      </div>
      <div className="pb-[5px] pt-[13px] font-medium">Company Name</div>
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
          type="text"
          value={formik.values.name}
          name="name"
          onChange={formik.handleChange}
          id="name"
          onBlur={formik.handleBlur}
          placeholder="E.g. Pacifista Corporation"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-red-500">{formik.errors.name}</p>
        )}
        <div className="pb-[5px] pt-[13px] font-medium">Email Address</div>
        <input
          className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
          type="text"
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          id="email"
          onBlur={formik.handleBlur}
          placeholder="E.g. Pacifista@mail.com"
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
          placeholder="E.g. PacifistaP@ssw0rd"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        )}
        <h2 className="pb-[5px] pt-[13px] font-medium">Phone Number</h2>
        <input
          className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
          type="text"
          value={formik.values.phoneNumber}
          name="phoneNumber"
          onChange={formik.handleChange}
          id="phoneNumber"
          onBlur={formik.handleBlur}
          placeholder="E.g. 0895*********"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <p className="text-sm text-red-500">{formik.errors.phoneNumber}</p>
        )}
        <div className="pt-[20px]">
          <Button
            className="bg-primary-blue text-light my-auto h-[45px] w-full items-center justify-center rounded-lg text-[17px] font-medium text-white"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
      <div className="flex w-full items-center justify-center pt-[14px]">
        <a
          className="text-primary-blue pt-[5px] text-[15px]"
          href="/companies/forgot-password"
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
        onClick={() => signIn('google-company', { type: 'google-company' })}
      >
        <div className="relative flex w-full items-center justify-center">
          <img
            src="/Google.svg"
            alt="Google Logo"
            className="absolute left-6 h-5 sm:static sm:px-3"
          />
          <center className="font-medium">Continue with Google</center>
        </div>
      </button>
      <div className="mt-4 flex gap-2 md:mt-5">
        {signInItem.map((item) => (
          <Link
            key={item}
            href={`/${item == 'User' ? 'users' : 'companies'}/login`}
            className="flex h-[45px] w-full items-center rounded-lg border-[1px] border-gray-300 bg-white hover:bg-gray-50"
          >
            <button className="relative flex w-full items-center justify-center">
              <center
                className={`${item == 'User' ? 'text-primary-blue' : 'text-[#9A6713]'} font-light`}
              >
                Sign In as {item}
              </center>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
