'use client';

import { createContext, useContext, useState } from 'react';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import {
  IFetchGetSubscriptionsRequest,
  ISubscriptionWithPayment,
} from '@/lib/interfaces/subscription';
import { getSubscriptions } from '@/lib/apis/subscription';
import { IPendingTransactionContext } from './interface';

const PendingTransactionContext = createContext<
  IPendingTransactionContext | undefined
>(undefined);

const PendingTransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [createdAtOrder, setCreatedAtOrder] = useState<OrderType>('desc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [subscriptions, setSubscriptions] = useState<
    ISubscriptionWithPayment[]
  >([]);

  const fetchGetSubscriptions = async (req?: IFetchGetSubscriptionsRequest) => {
    setIsLoading(true);

    const response = await getSubscriptions({
      limit: req?.limit || 8,
      order: req?.order || 'desc',
      page: req?.page || 1,
      status: ['PENDING'],
    });

    if (response.success) {
      setSubscriptions(response.data?.subscriptions || []);
      setTotalPages(response.data?.pagination.totalPages || 1);
      setPage(page || 1);
    }

    setIsLoading(false);
  };

  const handlePageChange = async (page: number) => {
    await fetchGetSubscriptions({ page, limit, order: createdAtOrder });
  };

  const handleCreateAtOrderChange = async () => {
    const updatedOrder = createdAtOrder === 'desc' ? 'asc' : 'desc';

    setCreatedAtOrder(updatedOrder);
    await fetchGetSubscriptions({
      page,
      limit,
      order: updatedOrder,
    });
  };

  return (
    <PendingTransactionContext.Provider
      value={{
        isLoading,
        setIsLoading,
        page,
        setPage,
        limit,
        setLimit,
        createdAtOrder,
        setCreatedAtOrder,
        subscriptions,
        setSubscriptions,
        totalPages,
        setTotalPages,
        fetchGetSubscriptions,
        handlePageChange,
        handleCreateAtOrderChange,
      }}
    >
      {children}
    </PendingTransactionContext.Provider>
  );
};

const usePendingTransactionContext = (): IPendingTransactionContext => {
  const context = useContext(PendingTransactionContext);
  if (context === undefined) {
    throw new Error(
      'usePendingTransactionContext must be used within a PendingTransactionProvider',
    );
  }
  return context;
};

export { PendingTransactionProvider, usePendingTransactionContext };
