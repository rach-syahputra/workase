/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/shadcn-ui/button';
import Logo from '@/components/ui/logo-for-auth';
import * as React from 'react';
import { FaGoogle } from 'react-icons/fa6';
const signUpItem = ['user', 'company'];
export default function Register() {
  return (
    <div className="font-geist mt-[-10px] md:w-[650px]">
      {' '}
      <div className="flex flex-col items-center justify-center pb-2">
        <div className="pb-2 text-[32px] font-semibold md:text-[36px]">
          Sign up to Workase
        </div>{' '}
        <div className="text-[18px] font-light md:text-[21px]">
          Create your personal account today.
        </div>
      </div>
      <div className="py-[10px] font-medium">Email Address</div>
      <input
        className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
        type="text"
        value={undefined}
        name="email"
        onChange={undefined}
        id="email"
        onBlur={undefined}
        placeholder="Email Address"
      />
      <h2 className="py-[10px] font-medium">Password</h2>
      <input
        className="h-[45px] w-full rounded-lg border-[1px] border-gray-300 pl-2 font-light md:font-medium"
        type="password"
        value={undefined}
        name="password"
        onChange={undefined}
        id="password"
        onBlur={undefined}
        placeholder="Password"
      />
      <div className="pt-[20px]">
        <Button
          className="bg-primary-blue text-light my-auto h-[45px] w-full items-center justify-center rounded-lg text-[17px] font-medium text-white"
          type="submit"
        >
          Sign up
        </Button>
      </div>
      <div className="flex w-full items-center justify-center pt-[14px]">
        <a
          className="text-primary-blue pt-[5px] text-[15px]"
          href="/forgotPass"
        >
          {' '}
          Need help? Contact support.
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
