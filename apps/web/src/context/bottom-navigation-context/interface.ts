import { Dispatch, SetStateAction } from 'react';

export interface IBottomNavigationContext {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
