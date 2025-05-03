'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Card } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';

interface ViewPaymentProofModalProps {
  paymentProof: string;
}

const ViewPaymentProofModal = ({
  paymentProof,
}: ViewPaymentProofModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="hover:text-primary-blue underline transition-all duration-300 ease-in-out"
        >
          View Payment Proof
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[80svh] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="sr-only text-2xl">Payment Proof</DialogTitle>
          <DialogDescription className="sr-only">
            View your payment proof
          </DialogDescription>
        </DialogHeader>
        <div className="flex aspect-auto min-w-[200px] items-center justify-center">
          {paymentProof ? (
            <Image
              src={paymentProof}
              alt="Payment proof"
              width={800}
              height={800}
              className="aspect-auto h-full w-full object-cover"
            />
          ) : (
            <p className="text-primary-gray">No payment proof.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPaymentProofModal;
