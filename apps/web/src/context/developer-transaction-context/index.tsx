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

import { getTransactionColumns } from '@/app/dev/(management)/transactions/_components/table/column';
import { ITransactionColumn } from '@/app/dev/(management)/transactions/_components/table/interface';
import {
  GetSubscriptionCategoryType,
  GetSubscriptionStatusType,
} from '@/lib/interfaces/api-request/subscription';
import {
  getSubscriptions,
  updateSubscriptionPayment,
} from '@/lib/apis/subscription';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import { SubscriptionCategoryType } from '@/lib/interfaces/subscription';
import {
  IDeveloperTransactionContext,
  IHandlePaymentRequest,
} from './interface';

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
  const [limit, setLimit] = useState<number>(10);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [status, setStatus] = useState<GetSubscriptionStatusType[]>(['ALL']);
  const [category, setCategory] = useState<GetSubscriptionCategoryType>('ALL');
  const [columns, setColumns] = useState<ColumnDef<ITransactionColumn>[]>([]);
  const [tableData, setTableData] = useState<ITransactionColumn[]>([]);
  const fetchGetSubscriptions = useCallback(async () => {
    setIsLoading(true);

    const response = await getSubscriptions({
      page,
      order: createdAtOrder,
      limit,
      status,
      category,
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
  }, [page, category, status, limit, createdAtOrder]);

  const handlePayment = useCallback(
    async (req: IHandlePaymentRequest) => {
      await updateSubscriptionPayment(req);
      await fetchGetSubscriptions();
    },
    [fetchGetSubscriptions],
  );

  const initiateColumns = useCallback(async () => {
    const session = await getSession();

    setColumns(
      getTransactionColumns({
        onCreatedAtClick: () =>
          setCreatedAtOrder(createdAtOrder === 'asc' ? 'desc' : 'asc'),
        handlePayment: handlePayment,
        developer: {
          email: session?.user?.email || '',
        },
      }),
    );
  }, [createdAtOrder, handlePayment]);

  useEffect(() => {
    fetchGetSubscriptions();
    initiateColumns();
  }, [fetchGetSubscriptions, initiateColumns]);

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
        category,
        setCategory,
        columns,
        setColumns,
        tableData,
        setTableData,
        fetchGetSubscriptions,
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
