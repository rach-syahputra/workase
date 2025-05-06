'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface IItem {
  id: number;
  label: string;
  icon: React.JSX.Element;
  href: string;
}

interface BottomNavigationProps {
  items: IItem[];
}

interface NavigationItemProps {
  item: IItem;
  className?: string;
}

const BottomNavigation = ({ items }: BottomNavigationProps) => {
  return (
    <nav className="border-border fixed bottom-0 left-0 z-[100] flex h-[52px] w-full items-center justify-between border-t bg-white shadow lg:hidden">
      {items &&
        items.length > 0 &&
        items.map((item, index) => <NavigationItem key={index} item={item} />)}
    </nav>
  );
};

const NavigationItem = ({ item, className }: NavigationItemProps) => {
  const pathname = usePathname();
  const isActive = item.href === pathname;

  return (
    <Link
      href={item.href}
      aria-label={`${item.label} page`}
      className={cn(
        'text-primary-gray hover:bg-primary-gray-background flex h-full w-full cursor-pointer flex-col items-center justify-center transition-all duration-300 ease-in-out',
        {
          'text-primary-blue border-primary-blue border-t': isActive,
        },
        className,
      )}
    >
      <div className="flex h-4 w-4 items-center justify-center">
        {item.icon}
      </div>
      <span className="text-xs">{item.label}</span>
    </Link>
  );
};

export default BottomNavigation;
