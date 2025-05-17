'use client';
import { signOut, useSession } from 'next-auth/react';
import { Sheet, SheetContent, SheetTrigger } from '../../../shadcn-ui/sheet';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useState, useEffect, useRef } from 'react';

const menuItems = [
  { label: 'Home', value: '' },
  { label: 'Jobs', value: 'all-jobs' },
  { label: 'Companies', value: 'all-companies' },
  { label: 'Reviews', value: 'company-reviews' },
];
const loginItems = ['Sign in', 'Register'];
const userAreaItems = ['Profile', 'Dashboard', 'Logout'];
export default function Sidebar() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [active, setActive] = useState('Find salaries');
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Hamburger Button */}
      <SheetTrigger className="h-[60px] w-[38px] md:hidden" asChild>
        <button
          className="mt-[9.2px] h-[60px] w-[25px]"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="right" className="p-0 w-72">
        {/* Close Button */}
        <div className="flex justify-end p-5">
          <SheetTrigger asChild>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-0 h-0" />
            </button>
          </SheetTrigger>
        </div>

        {/* Login */}
        {session?.user?.accessToken ? null : (
          <nav className="space-y-1 border-b-[10px] border-t-[1px]">
            {loginItems.map((item) => (
              <Link
                key={item}
                href={
                  item === 'Sign in'
                    ? `/users/login?redirect=${encodeURIComponent(currentPath)}`
                    : 'users/register'
                }
                onClick={() => setIsOpen(false)}
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
        )}

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

        {/* User Area */}
        {session?.user?.accessToken && (
          <nav className="space-y-1 border-t-[10px]">
            {userAreaItems.map((item) => (
              <Link
                key={item}
                href={
                  item === 'Profile'
                    ? session?.user?.role === 'USER'
                      ? `/w/${session?.user?.slug}`
                      : `/profile-management`
                    : item === 'Dashboard'
                      ? '/dashboard/applied-jobs'
                      : '/'
                }
                onClick={() => {
                  if (item === 'Logout') signOut();
                  setIsOpen(false);
                }}
              >
                <button
                  onClick={() => {}}
                  className={`text-md flex w-full items-center justify-between px-5 py-3 text-left font-semibold text-gray-600 hover:bg-gray-100`}
                >
                  {item}
                  <span>{'>'}</span>
                </button>
              </Link>
            ))}
          </nav>
        )}
      </SheetContent>
    </Sheet>
  );
}
