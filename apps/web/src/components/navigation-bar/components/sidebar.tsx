'use client';

import { Sheet, SheetContent, SheetTrigger } from '../../shadcn-ui/sheet';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState('Find salaries');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Hindari rendering di server

  const menuItems = ['Home', 'Jobs', 'Companies'];

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

        {/* Menu List */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`text-md flex w-full items-center justify-between px-5 py-3 text-left font-medium ${
                active === item ? 'font-semibold text-blue-600' : 'text-black'
              } hover:bg-gray-100`}
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
