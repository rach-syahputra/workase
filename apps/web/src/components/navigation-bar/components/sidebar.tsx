'use client';

import { Sheet, SheetContent, SheetTrigger } from '../../shadcn-ui/sheet';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Hindari rendering di server

  const menuItems = ['Home', 'Jobs', 'Companies'];
  const loginItems = ['Sign in', 'Employers/Post Job'];
  return (
    <Sheet>
      {/* Hamburger Button */}
      <SheetTrigger className="mt-[4px] h-[44px] w-[50px] md:hidden">
        <button className="h-[38px] w-[20px]">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="right" className="w-72 p-0">
        {/* Close Button */}
        <div className="flex justify-end p-5">
          <SheetTrigger asChild></SheetTrigger>
        </div>

        {/* Login */}
        <nav className="space-y-1 border-b-[10px] border-t-[1px]">
          {loginItems.map((item) => (
            <button
              key={item}
              onClick={() => {}}
              className={`text-md ${item === 'Sign in' ? 'text-primary-dark-blue' : 'text-gray-600'} flex w-full items-center justify-between border-b-[1px] px-5 py-3 text-left font-semibold hover:bg-gray-100`}
            >
              {item}
              <span>{'>'}</span>
            </button>
          ))}
        </nav>

        {/* Menu List */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`text-md flex w-full items-center justify-between px-5 py-3 text-left font-medium ${
                active === item
                  ? 'text-primary-dark font-semibold'
                  : 'text-primary-gray'
              } border-b-[1px] hover:bg-gray-100`}
            >
              {item}
              <span>{'>'}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
