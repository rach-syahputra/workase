import { Dispatch, SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { IPendingTransactionColumn } from '@/app/dashboard/transactions/_components/table/interface';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import {
  IFetchGetSubscriptionsRequest,
  ISubscriptionWithPayment,
} from '@/lib/interfaces/subscription';

export interface IPendingTransactionContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  createdAtOrder: OrderType;
  setCreatedAtOrder: Dispatch<SetStateAction<OrderType>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  subscriptions: ISubscriptionWithPayment[];
  setSubscriptions: Dispatch<SetStateAction<ISubscriptionWithPayment[]>>;
  fetchGetSubscriptions: (req?: IFetchGetSubscriptionsRequest) => void;
  handlePageChange: (page: number) => void;
  handleCreateAtOrderChange: () => void;
}
