'use client';

import { useState } from 'react';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import CreateCompanyReviewForm from './create-company-review-form';

const CreateCompanyReviewModal = () => {
  const { userCurrentCompanies } = useCompaniesReviewsContext();
  const [open, onOpenChange] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={
            !userCurrentCompanies.length || userCurrentCompanies.length === 0
          }
        >
          Create Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-svh gap-6 overflow-y-auto sm:max-h-[80vh] sm:max-w-[500px]">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-xl">Post Review</DialogTitle>
          <DialogDescription>
            Share your professional experience to guide job seekers in their
            decisions.
          </DialogDescription>
        </DialogHeader>
        <CreateCompanyReviewForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyReviewModal;
