'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Card } from '@/components/shadcn-ui/card';

interface ViewPaymentProofModalProps {
  paymentProof: string;
}

const ViewPaymentProofModal = ({
  paymentProof,
}: ViewPaymentProofModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card
        onClick={() => setOpen(true)}
        className="mt-4 aspect-square cursor-pointer max-md:w-full md:h-full"
      >
        <Image
          src={paymentProof}
          alt="Payment proof"
          width={400}
          height={400}
          className="aspect-square rounded-md object-cover"
        />
      </Card>

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
