'use client';

import { useState } from 'react';

import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import CreateAssessmentForm from './create-assessment-form';

interface CreateAssessmentModalProps {
  id: string;
  title: string;
}

const CreateAssessmentModal = ({ id, title }: CreateAssessmentModalProps) => {
  const { setSelectedSkill } = useCreateAssessmentContext();
  const [open, onOpenChange] = useState<boolean>(false);

  const handleCreateAssessmentModal = () => {
    setSelectedSkill({
      id,
      title,
    });

    onOpenChange(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="dark"
          onClick={handleCreateAssessmentModal}
          className="md:px-6"
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-svh min-h-[60%] flex-col gap-6 overflow-y-auto sm:max-h-[80vh] sm:max-w-[425px]">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-xl">Create Assessment</DialogTitle>
          <DialogDescription>
            Create skill-based assessment to support user development.
          </DialogDescription>
        </DialogHeader>
        <CreateAssessmentForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssessmentModal;
