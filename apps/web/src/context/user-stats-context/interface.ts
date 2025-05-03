import { Dispatch, SetStateAction } from 'react';

import { IUserStats } from '@/lib/interfaces/user-stats';

export interface IUserStatsContext {
  userStats: IUserStats | undefined;
  setUserStats: Dispatch<SetStateAction<IUserStats | undefined>>;
  fetchGetUserStats: () => void;
}
