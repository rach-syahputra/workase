'use client';
import { Sheet, SheetContent, SheetTrigger } from '../../../shadcn-ui/sheet';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import router from 'next/router';

import { useState, useEffect, useRef } from 'react';

const menuItems = [
  { label: 'Home', value: '' },
  { label: 'Jobs', value: 'all-jobs' },
  { label: 'Companies', value: 'companies' },
];
const loginItems = ['Sign in', 'Register'];

export default function Sidebar() {
  const searchParams = useSearchParams();

  const [active, setActive] = useState('Find salaries');
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

  useEffect(() => {
    const current = pathname.split('/')[1];
    const matchedTab = menuItems.find((item) => item.value === current);
    if (matchedTab) {
      setActive(matchedTab.label);
    }
  }, [pathname]);

  const handleTabClick = (tab: (typeof menuItems)[number]) => {
    const queryString = searchParams.toString();
    const path = `/${tab.value}${queryString ? '?' + queryString : ''}`;
    router.push(path);
    setActive(tab.label);
  };

  return (
    <Sheet>
      {/* Hamburger Button */}
      <SheetTrigger className="mt-[4px] h-[44px] w-[45px] md:hidden" asChild>
        <button className="h-[38px] w-[20px]">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="right" className="w-72 p-0">
        {/* Close Button */}
        <div className="flex justify-end p-5">
          <SheetTrigger asChild>
            <button>
              <X className="h-0 w-0" />
            </button>
          </SheetTrigger>
        </div>

        {/* Login */}
        <nav className="space-y-1 border-b-[10px] border-t-[1px]">
          {loginItems.map((item) => (
            <Link
              key={item}
              href={
                item === 'Sign in'
                  ? `/users/login?redirect=${encodeURIComponent(currentPath)}`
                  : 'users/register'
              }
            >
              <button
                onClick={() => {}}
                className={`text-md ${item === 'Sign in' ? 'text-primary-dark-blue' : 'text-gray-600'} flex w-full items-center justify-between border-b-[1px] px-5 py-3 text-left font-semibold hover:bg-gray-100`}
              >
                {item}
                <span>{'>'}</span>
              </button>
            </Link>
          ))}
        </nav>

        {/* Menu List */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleTabClick(item)}
              className={`text-md flex w-full items-center justify-between px-5 py-3 text-left font-medium ${
                active === item.label
                  ? 'font-semibold text-blue-600'
                  : 'text-black'
              } hover:bg-gray-100`}
            >
              {item.label}
              <span>{'>'}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
