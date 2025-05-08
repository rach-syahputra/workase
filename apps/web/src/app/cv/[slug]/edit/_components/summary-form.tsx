'use client';

import { getIn } from 'formik';
import { X } from 'lucide-react';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import TextareaFormInput from '@/components/ui/textarea-form-input';
import { Button } from '@/components/shadcn-ui/button';
import AutoGenerateSummaryModal from './auto-generate-summary-modal';

const SummaryForm = () => {
  const {
    formik,
    setGeneratedSummary,
    isComparingSummary,
    setIsComparingSummary,
  } = useCvEditFormContext();

  const handleAcceptCurrentSummary = () => {
    setIsComparingSummary(false);
    setGeneratedSummary('');
  };

  return (
    <Card className="flex flex-col gap-4 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="text-xl font-bold">Summary</h2>
      <TextareaFormInput
        labelColor="gray"
        name="data.summary.content"
        label="Content"
        rows={7}
        onChange={formik.handleChange}
        value={formik.values.data.summary?.content as string}
        errorMessage={getIn(formik.errors, 'data.summary.content')}
      />
      {isComparingSummary ? (
        <Button
          type="button"
          onClick={handleAcceptCurrentSummary}
          className="w-fit bg-yellow-600 hover:bg-yellow-500"
        >
          <X size={16} />
          Accept Current Summary
        </Button>
      ) : (
        <AutoGenerateSummaryModal />
      )}
    </Card>
  );
};

export default SummaryForm;
