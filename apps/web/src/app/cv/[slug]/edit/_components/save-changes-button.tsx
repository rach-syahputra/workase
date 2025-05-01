'use client';

import { Save } from 'lucide-react';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Button } from '@/components/shadcn-ui/button';

interface SaveChangesButtonProps {
  className?: string;
}

const SaveChangesButton = ({ className }: SaveChangesButtonProps) => {
  const { formik } = useCvEditFormContext();

  return (
    <Button
      type="submit"
      disabled={!formik.dirty || formik.isSubmitting}
      className={className}
    >
      <Save size={16} />
      Save Changes
    </Button>
  );
};

export default SaveChangesButton;
