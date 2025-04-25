import { Dispatch, SetStateAction } from 'react';

import {
  IFetchGetSubscriptionsRequest,
  SubscriptionPaymentStatusType,
} from '@/lib/interfaces/subscription';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { ColumnDef } from '@tanstack/react-table';
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
  status: SubscriptionPaymentStatusType | 'ALL';
  setStatus: Dispatch<SetStateAction<SubscriptionPaymentStatusType | 'ALL'>>;
  columns: ColumnDef<ITransactionColumn>[];
  setColumns: Dispatch<SetStateAction<ColumnDef<ITransactionColumn>[]>>;
  tableData: ITransactionColumn[];
  setTableData: Dispatch<SetStateAction<ITransactionColumn[]>>;
  fetchGetSubscriptions: (req?: IFetchGetSubscriptionsRequest) => void;
  handleSelectStatus: (
    newStatus: SubscriptionPaymentStatusType | 'ALL',
  ) => void;
  handlePageChange: (page: number) => void;
  handleCreateAtOrderChange: () => void;
  handlePayment: (req: IHandlePaymentRequest) => void;
}
