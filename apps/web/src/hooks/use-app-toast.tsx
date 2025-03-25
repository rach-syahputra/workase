import { useToast } from './use-toast';

import { ToastActionElement } from '@/components/shadcn-ui/toast';

type ToastType =
  | 'SUCCESS'
  | 'ERROR_NETWORK'
  | 'ERROR_UNAUTHENTICATED'
  | 'ERROR_UNAUTHORIZED';

interface ToastOption {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: ToastActionElement;
}

const useAppToast = () => {
  const { toast } = useToast();

  const appToast = (type: ToastType = 'SUCCESS', option?: ToastOption) => {
    let toastProps: ToastOption = {
      title: 'Success',
      description: 'Your action was successfull.',
      variant: 'default',
      action: option?.action,
    };

    if (type === 'SUCCESS') {
      toastProps = {
        title: option?.title || 'Success',
        description: option?.description || 'Your action was successfull.',
        variant: 'default',
        action: option?.action,
      };
    } else if (type === 'ERROR_NETWORK') {
      toastProps = {
        title: option?.title || 'Network Error',
        description:
          option?.description ||
          'Please check your internet connection and try again.',
        variant: 'destructive',
        action: option?.action,
      };
    } else if (type === 'ERROR_UNAUTHENTICATED') {
      toastProps = {
        title: option?.title || `You're Not Signed In`,
        description:
          option?.description || 'To continue, please log in to your account.',
        variant: 'destructive',
        action: option?.action,
      };
    } else if (type === 'ERROR_UNAUTHORIZED') {
      toastProps = {
        title: option?.title || 'Access Denied',
        description:
          option?.description ||
          'You are not authorized to perform this action.',
        variant: 'destructive',
        action: option?.action,
      };
    }

    return toast(toastProps);
  };

  return {
    appToast,
  };
};

export { useAppToast };
