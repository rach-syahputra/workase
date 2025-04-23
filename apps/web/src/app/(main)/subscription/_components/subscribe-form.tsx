'use client';

import { useFormik } from 'formik';

import { AddSubscriptionFormValues } from '@/lib/interfaces/form/subscription';
import { addSubscription } from '@/lib/apis/subscription';
import { addSubscriptionSchema } from '@/validations/subscription';
import { useAppToast } from '@/hooks/use-app-toast';
import { Button } from '@/components/shadcn-ui/button';
import FormSelectInput from '@/components/ui/form-select-input';

const SubscribeForm = () => {
  const { appToast } = useAppToast();

  const formik = useFormik<AddSubscriptionFormValues>({
    initialValues: {
      category: 'STANDARD',
      paymentStatus: 'PENDING',
    },
    validationSchema: addSubscriptionSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values: AddSubscriptionFormValues, { resetForm }) => {
      formik.setStatus('');

      const response = await addSubscription(values);

      if (response.success) {
        resetForm();
      } else {
        if (response.code === 'ERR_NETWORK') {
          // TO DO: add toast action to redirect to the login page
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-1 flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-6">
        <FormSelectInput
          label="Category"
          selectLabel="Category"
          name="category"
          onChange={formik.handleChange}
          values={[
            {
              id: 'STANDARD',
              label: 'Standard',
            },
            {
              id: 'PROFESSIONAL',
              label: 'Professional',
            },
          ]}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {formik.status && (
          <p className="text-center text-sm text-red-500">{formik.status}</p>
        )}
        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          Proceed to Payment
        </Button>
      </div>
    </form>
  );
};

export default SubscribeForm;
