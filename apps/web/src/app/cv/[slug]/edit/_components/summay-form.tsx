'use client';

import { getIn } from 'formik';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import TextareaFormInput from '@/components/ui/textarea-form-input';

const SummaryForm = () => {
  const { formik } = useCvEditFormContext();

  return (
    <Card className="flex flex-col gap-4 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="text-xl font-bold">Summary</h2>
      <TextareaFormInput
        labelColor="gray"
        name="data.summary.content"
        label="Content"
        onChange={formik.handleChange}
        value={formik.values.data.summary?.content as string}
        errorMessage={getIn(formik.errors, 'data.summary.content')}
      />
    </Card>
  );
};

export default SummaryForm;
