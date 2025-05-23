'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

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
    <nav className="border-border h-bottom-bar fixed bottom-0 left-0 z-[100] flex w-full items-center justify-between border-t bg-white shadow lg:hidden">
      {items &&
        items.length > 0 &&
        items.map((item, index) => <NavigationItem key={index} item={item} />)}
    </nav>
  );
};

const NavigationItem = ({ item, className }: NavigationItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  const isActive = item.href === currentUrl;

  return (
    <Link
      href={item.href}
      aria-label={`${item.label} page`}
      className={cn(
        'text-primary-gray hover:bg-primary-gray-background flex h-full w-full cursor-pointer flex-col items-center justify-center bg-white transition-all duration-300 ease-in-out active:bg-white',
        {
          'text-primary-blue border-primary-blue border-t': isActive,
        },
        className,
      )}
    >
      <div className="flex h-4 w-4 items-center justify-center">
        {item.icon}
      </div>
      <span className="text-[10px]">{item.label}</span>
    </Link>
  );
};

export default BottomNavigation;
