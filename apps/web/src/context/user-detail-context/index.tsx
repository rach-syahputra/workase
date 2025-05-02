'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IUserDetail } from '@/lib/interfaces/user-stats';
import { getUserDetail } from '@/lib/apis/user-stats';
import { IUserDetailContext } from './interface';

const UserDetailContext = createContext<IUserDetailContext | undefined>(
  undefined,
);

const UserDetailProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeProfileMenuItemId, setActiveProfileMenuItemId] = useState<
    number | null
  >(null);
  const [user, setUser] = useState<IUserDetail>();

  const fetchGetUserDetail = useCallback(async () => {
    setIsLoading(true);

    const response = await getUserDetail({ slug });

    if (response.success) {
      setUser(response.data?.user);
    }

    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchGetUserDetail();
  }, [fetchGetUserDetail]);

  return (
    <UserDetailContext.Provider
      value={{
        isLoading,
        setIsLoading,
        activeProfileMenuItemId,
        setActiveProfileMenuItemId,
        user,
        setUser,
      }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};

const useUserDetailContext = (): IUserDetailContext => {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error(
      'useUserDetailContext must be used within a UserDetailProvider',
    );
  }
  return context;
};

export { UserDetailProvider, useUserDetailContext };
