'use client';
import { Button } from '@/components/shadcn-ui/button';
import { IUpdateForm } from '@/lib/interfaces/profile';
import { FormikProps } from 'formik';
import * as React from 'react';
interface SaveButtonProps {
  formik: FormikProps<IUpdateForm>;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ formik }) => {
  return (
    <div className="max-w-[1065px] md:px-[30px]">
      <div className="right-0 flex justify-end pt-[20px]">
        <Button
          className="bg-primary-blue right-0 h-10 w-full cursor-pointer rounded-md px-8 pt-[-2px] text-center text-[15px] font-semibold md:w-fit"
          type="submit"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
