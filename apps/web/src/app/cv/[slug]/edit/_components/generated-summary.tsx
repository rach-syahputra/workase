'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import { Label } from '@/components/shadcn-ui/label';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { Button } from '@/components/shadcn-ui/button';

interface GeneratedSummaryProps {
  className?: string;
}

const GeneratedSummary = ({ className }: GeneratedSummaryProps) => {
  const {
    generatedSummary,
    setGeneratedSummary,
    formik,
    setIsComparingSummary,
  } = useCvEditFormContext();

  const handleAcceptGeneratedSummary = () => {
    formik.setFieldValue('data.summary.content', generatedSummary);
    setIsComparingSummary(false);
    setGeneratedSummary('');
  };

  return (
    <Card
      className={cn(
        'flex w-full flex-col gap-4 p-4 max-md:border-none max-md:shadow-none md:p-5',
        className,
      )}
    >
      <h2 className="text-xl font-bold">Generated Summary</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="generatedSummary" className="text-primary-gray">
          Content
        </Label>
        <Textarea
          name="generatedSummary"
          rows={7}
          value={generatedSummary}
          contentEditable={false}
        />
      </div>
      <Button
        type="button"
        onClick={handleAcceptGeneratedSummary}
        className="w-fit bg-green-600 hover:bg-green-500"
      >
        <Check size={16} />
        Accept Generated Summary
      </Button>
    </Card>
  );
};

export default GeneratedSummary;
