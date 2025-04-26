'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { IUserStats } from '@/lib/interfaces/user-stats';
import { getUserStats } from '@/lib/apis/user-stats';
import { IUserStatsContext } from './interface';

const UserStatsContext = createContext<IUserStatsContext | undefined>(
  undefined,
);

const UserStatsProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [userStats, setUserStats] = useState<IUserStats | undefined>(undefined);

  const fetchGetUserStats = async () => {
    const response = await getUserStats();

    if (response.success) {
      setUserStats(response.data?.stats);
    }
  };

  useEffect(() => {
    // Initiate user stats for the first time
    if (session.data?.user?.role === 'USER' && !userStats) {
      fetchGetUserStats();
    }
  }, [session]);

  return (
    <UserStatsContext.Provider
      value={{
        userStats,
        setUserStats,
        fetchGetUserStats,
      }}
    >
      {children}
    </UserStatsContext.Provider>
  );
};

const useUserStatsContext = (): IUserStatsContext => {
  const context = useContext(UserStatsContext);
  if (context === undefined) {
    throw new Error(
      'useUserStatsContext must be used within a UserStatsProvider',
    );
  }
  return context;
};

export { UserStatsProvider, useUserStatsContext };
