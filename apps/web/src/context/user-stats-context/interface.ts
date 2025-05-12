import { Dispatch, SetStateAction } from 'react';

import { IUserStats } from '@/lib/interfaces/user-stats';

export interface IUserStatsContext {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  userStats: IUserStats | undefined;
  setUserStats: Dispatch<SetStateAction<IUserStats | undefined>>;
  fetchGetUserStats: () => void;
}
