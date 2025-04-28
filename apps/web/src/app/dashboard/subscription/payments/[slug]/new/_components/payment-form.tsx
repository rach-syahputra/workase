'use client';

import { useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clipboard } from 'lucide-react';

import { uploadSubcsriptionPaymentProof } from '@/lib/apis/subscription';
import { PaymentFormValues } from '@/lib/interfaces/form/subscription';
import { ISubscriptionPayment } from '@/lib/interfaces/subscription';
import { useToast } from '@/hooks/use-toast';
import { paymentSchema } from '@/validations/subscription';
import { useAppToast } from '@/hooks/use-app-toast';
import { Button } from '@/components/shadcn-ui/button';
import FormImageInput from '@/components/ui/form-image-input';
import PaymentCountdown from './payment-countdown';

interface PaymentFormProps {
  payment: ISubscriptionPayment;
}

const PaymentForm = ({ payment }: PaymentFormProps) => {
  const router = useRouter();
  const { appToast } = useAppToast();
  const { toast } = useToast();
  const [paymentProofPreview, setPaymentProofPreview] = useState<string>('');
  const accountNumber = '777 0813 4758 0400';

  const formik = useFormik<PaymentFormValues>({
    initialValues: {
      subscriptionId: payment.subscriptionId,
      subscriptionPaymentId: payment.id,
      paymentProof: null,
    },
    validationSchema: paymentSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: PaymentFormValues, { resetForm }) => {
      formik.setStatus('');

      const response = await uploadSubcsriptionPaymentProof(values);

      if (response.success) {
        router.push('/dashboard/subscription');

        resetForm();
      } else {
        if (response.code === 'ERR_NETWORK') {
          appToast('ERROR_NETWORK');
        } else if (response.code === 'ERR_UNAUTHENTICATED') {
          appToast('ERROR_UNAUTHENTICATED');
        } else if (response.code === 'ERR_UNAUTHORIZED') {
          appToast('ERROR_UNAUTHORIZED');
        } else {
          formik.setStatus(response.error?.message);
        }
      }
    },
  });

  const handlePaymentProofChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const paymentProof = event.target.files[0];
      setPaymentProofPreview(URL.createObjectURL(paymentProof));

      formik.setFieldValue('paymentProof', paymentProof);
    }
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber.replace(/\s+/g, ''));
    toast({
      title: 'Account Number Copied',
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full max-w-[500px] flex-1 flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center">
          <span className="text-primary-gray text-sm font-medium">
            Pay within
          </span>
          <PaymentCountdown startTime={new Date(payment.createdAt)} />
        </div>
        <div className="flex flex-col">
          <span className="text-primary-gray text-sm font-medium">
            Subscription Plan
          </span>
          <p className="text-lg font-bold">{payment.category}</p>
        </div>
        <div className="flex flex-col">
          <span className="text-primary-gray text-sm font-medium">
            Total Price
          </span>
          <p className="text-lg font-bold">${payment.totalPrice}</p>
        </div>
        <div className="flex flex-col">
          <span className="text-primary-gray text-sm font-medium">
            Account No.
          </span>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">{accountNumber}</p>
            <Clipboard
              size={18}
              onClick={handleCopyAccountNumber}
              className="text-primary-gray cursor-pointer"
            />
          </div>
        </div>
        <FormImageInput
          label="Payment Proof"
          name="paymentProof"
          preview={paymentProofPreview}
          onChange={handlePaymentProofChange}
          errorMessage={formik.errors.paymentProof}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {formik.status && (
          <p className="text-center text-sm text-red-500">{formik.status}</p>
        )}
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          Submit Payment
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
