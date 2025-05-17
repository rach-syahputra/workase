'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenuDemo from './dropdown-menu';
import { usePathname, useSearchParams } from 'next/navigation';
const tabs = ['Sign in', 'Employers/Post Job'];

export default function Login() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  return (
    <div className="mt-[5px] hidden items-center md:flex">
      {session?.user?.email ? (
        <div className="ml-[40px] flex w-[90px] items-center justify-between text-center md:w-[180px]">
          <div className="hidden text-center md:block">
            {session.user.email ? (
              <div className="flex items-center">
                <div className="w-24 mr-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {session.user.email.split('@')[0]}
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="mr-1">{session.user.name}</div>
              </div>
            )}
          </div>
          <span className="h-7 w-[1px] bg-gray-300"></span>
          <DropdownMenuDemo></DropdownMenuDemo>
        </div>
      ) : (
        tabs.map((tab) => (
          <div key={tab} className="relative flex items-center">
            <Link
              href={
                tab === 'Sign in'
                  ? `/users/login?redirect=${encodeURIComponent(currentPath)}`
                  : `/companies/login?redirect=${encodeURIComponent(currentPath)}`
              }
              className={`relative flex h-[68px] w-full items-center px-5 text-[15px] font-medium transition-all ${tab === 'Sign in' ? 'text-primary-dark-blue font-semibold' : 'text-gray-600'} `}
            >
              <button ref={undefined}>{tab}</button>
            </Link>
            {tab === 'Sign in' && (
              <span className="h-7 w-[1px] bg-gray-300"></span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
