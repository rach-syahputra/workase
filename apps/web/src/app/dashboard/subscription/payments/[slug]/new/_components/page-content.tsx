'use client';

import { useCallback, useEffect, useState } from 'react';

import { getSubscriptionPaymentBySlug } from '@/lib/apis/subscription';
import { ISubscriptionPayment } from '@/lib/interfaces/subscription';
import PaymentForm from './payment-form';
import PaymentFormSkeleton from './payment-form-skeleton';

interface PageContentProps {
  slug: string;
}

const PageContent = ({ slug }: PageContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [payment, setPayment] = useState<ISubscriptionPayment>();

  const fetchGetSubscriptionPaymentBySlug = useCallback(async () => {
    setIsLoading(true);

    const response = await getSubscriptionPaymentBySlug({ slug });
    const paymentRes = response.data?.subscriptionPayment;

    if (response.success) {
      setPayment(paymentRes);
    }

    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchGetSubscriptionPaymentBySlug();
  }, [fetchGetSubscriptionPaymentBySlug]);

  return isLoading ? (
    <PaymentFormSkeleton />
  ) : (
    <PaymentForm payment={payment!} />
  );
};

export default PageContent;
