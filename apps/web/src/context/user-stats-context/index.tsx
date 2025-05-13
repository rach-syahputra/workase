'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSession } from 'next-auth/react';

import { IUserStats } from '@/lib/interfaces/user-stats';
import { getUserStats } from '@/lib/apis/user-stats';
import { IUserStatsContext } from './interface';

const UserStatsContext = createContext<IUserStatsContext | undefined>(
  undefined,
);

const UserStatsProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [update, setUpdate] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<IUserStats | undefined>(undefined);

  const fetchGetUserStats = useCallback(async () => {
    const response = await getUserStats();
    const stats = response.data?.stats;

    if (response.success && stats) {
      setUserStats({
        ...stats,
        subscription: {
          ...stats.subscription,
          plan: !stats.subscription.plan ? 'FREE' : stats.subscription.plan,
        },
      });
    }
  }, []);

  useEffect(() => {
    // Initiate user stats for the first time
    if (update) {
      setUpdate(false);
      fetchGetUserStats();
    }
  }, [session, update, fetchGetUserStats, userStats]);

  return (
    <UserStatsContext.Provider
      value={{
        update,
        setUpdate,
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
