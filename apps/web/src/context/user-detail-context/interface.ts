import { Dispatch, SetStateAction } from 'react';

import { IUserDetail } from '@/lib/interfaces/user-stats';

export interface IUserDetailContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeProfileMenuItemId: number | null;
  setActiveProfileMenuItemId: Dispatch<SetStateAction<number | null>>;
  user: IUserDetail | undefined;
  setUser: Dispatch<SetStateAction<IUserDetail | undefined>>;
}
