import { Dispatch, SetStateAction } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import {
  IFetchGetSubscriptionsRequest,
  SubscriptionPaymentStatusType,
} from '@/lib/interfaces/subscription';
import {
  GetSubscriptionCategoryType,
  GetSubscriptionStatusType,
} from '@/lib/interfaces/api-request/subscription';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { ITransactionColumn } from '@/app/dev/(management)/transactions/_components/table/interface';

export interface IHandlePaymentRequest {
  subscriptionId: string;
  subscriptionPaymentId: string;
  paymentStatus: SubscriptionPaymentStatusType;
}

export interface IDeveloperTransactionContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  createdAtOrder: OrderType;
  setCreatedAtOrder: Dispatch<SetStateAction<OrderType>>;
  status: GetSubscriptionStatusType[];
  setStatus: Dispatch<SetStateAction<GetSubscriptionStatusType[]>>;
  category: GetSubscriptionCategoryType;
  setCategory: Dispatch<SetStateAction<GetSubscriptionCategoryType>>;
  columns: ColumnDef<ITransactionColumn>[];
  setColumns: Dispatch<SetStateAction<ColumnDef<ITransactionColumn>[]>>;
  tableData: ITransactionColumn[];
  setTableData: Dispatch<SetStateAction<ITransactionColumn[]>>;
  fetchGetSubscriptions: () => void;
  handlePayment: (req: IHandlePaymentRequest) => void;
}
