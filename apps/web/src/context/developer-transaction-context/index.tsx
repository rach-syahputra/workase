'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getSession } from 'next-auth/react';
import { ColumnDef } from '@tanstack/react-table';

import { ITransactionColumn } from '@/app/dev/(management)/transactions/_components/table/interface';
import {
  getSubscriptions,
  updateSubscriptionPayment,
} from '@/lib/apis/subscription';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import {
  IFetchGetSubscriptionsRequest,
  SubscriptionCategoryType,
  SubscriptionPaymentStatusType,
} from '@/lib/interfaces/subscription';
import {
  IDeveloperTransactionContext,
  IHandlePaymentRequest,
} from './interface';
import { getTransactionColumns } from '@/app/dev/(management)/transactions/_components/table/column';

const DeveloperTransactionContext = createContext<
  IDeveloperTransactionContext | undefined
>(undefined);

const DeveloperTransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [status, setStatus] = useState<SubscriptionPaymentStatusType | 'ALL'>(
    'ALL',
  );
  const [columns, setColumns] = useState<ColumnDef<ITransactionColumn>[]>([]);
  const [tableData, setTableData] = useState<ITransactionColumn[]>([]);

  const initiateColumns = async () => {
    const session = await getSession();

    setColumns(
      getTransactionColumns({
        onCreatedAtClick: handleCreateAtOrderChange,
        handlePayment: handlePayment,
        developer: {
          email: session?.user?.email || '',
        },
      }),
    );
  };

  const fetchGetSubscriptions = async (req?: IFetchGetSubscriptionsRequest) => {
    setIsLoading(true);

    const response = await getSubscriptions({
      page: req?.page || 1,
      order: req?.order || 'desc',
      limit: req?.limit || 8,
      status: !req?.status || req?.status === 'ALL' ? [] : [req.status],
    });
    const subscriptions = response.data?.subscriptions;
    const pagination = response.data?.pagination;

    if (response.success && subscriptions) {
      setTableData(
        subscriptions.map((subscription) => ({
          id: subscription.id,
          createdAt: subscription.payment.createdAt,
          category: subscription.category as SubscriptionCategoryType,
          user: subscription.user!,
          payment: {
            id: subscription.payment.id,
            slug: subscription.payment.slug,
            status: subscription.payment.paymentStatus,
          },
          paymentProof: subscription.payment.paymentProof,
          price: subscription.payment.totalPrice,
        })),
      );
      setPage(pagination?.page || 1);
      setTotalPages(pagination?.totalPages || 0);
    }

    setIsLoading(false);
  };

  const handleSelectStatus = async (
    newStatus: SubscriptionPaymentStatusType | 'ALL',
  ) => {
    setStatus(newStatus);
    await fetchGetSubscriptions({
      page,
      limit,
      order: createdAtOrder,
      status: newStatus,
    });
  };

  const handlePageChange = async (page: number) => {
    setPage(page);
    await fetchGetSubscriptions({ page, limit, order: createdAtOrder, status });
  };

  const handleCreateAtOrderChange = async () => {
    const updatedOrder = createdAtOrder === 'desc' ? 'asc' : 'desc';

    console.log('status in order', status);

    setCreatedAtOrder(updatedOrder);
    await fetchGetSubscriptions({
      page,
      limit,
      order: updatedOrder,
      status,
    });
  };

  const handlePayment = async (req: IHandlePaymentRequest) => {
    await updateSubscriptionPayment(req);
    await fetchGetSubscriptions();
  };

  useEffect(() => {
    initiateColumns();
  }, [page, status, createdAtOrder, limit]);

  return (
    <DeveloperTransactionContext.Provider
      value={{
        isLoading,
        setIsLoading,
        totalPages,
        setTotalPages,
        page,
        setPage,
        limit,
        setLimit,
        createdAtOrder,
        setCreatedAtOrder,
        status,
        setStatus,
        columns,
        setColumns,
        tableData,
        setTableData,
        fetchGetSubscriptions,
        handleSelectStatus,
        handlePageChange,
        handleCreateAtOrderChange,
        handlePayment,
      }}
    >
      {children}
    </DeveloperTransactionContext.Provider>
  );
};

const useDeveloperTransactionContext = (): IDeveloperTransactionContext => {
  const context = useContext(DeveloperTransactionContext);
  if (context === undefined) {
    throw new Error(
      'useDeveloperTransactionContext must be used within a DeveloperTransactionProvider',
    );
  }
  return context;
};

export { DeveloperTransactionProvider, useDeveloperTransactionContext };
