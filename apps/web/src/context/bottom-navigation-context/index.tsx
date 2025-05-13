'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { BOTTOM_NAVIGATION_HREFS } from '@/lib/constants/constants';
import { IBottomNavigationContext } from './interface';

const BottomNavigationContext = createContext<
  IBottomNavigationContext | undefined
>(undefined);

const BottomNavigationProdiver = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const match =
      BOTTOM_NAVIGATION_HREFS.includes(pathname) || pathname.startsWith('/w/');
    setShow(!!match);
  }, [pathname]);

  return (
    <BottomNavigationContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </BottomNavigationContext.Provider>
  );
};

const useBottomNavigationContext = (): IBottomNavigationContext => {
  const context = useContext(BottomNavigationContext);
  if (context === undefined) {
    throw new Error(
      'useBottomNavigationContext must be used within a BottomNavigationProvider',
    );
  }
  return context;
};

export { BottomNavigationProdiver, useBottomNavigationContext };
