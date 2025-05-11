'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';

import { useAssessmentContext } from '@/context/assessment-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';

interface DeleteAssessmentModalProps {
  onDeleteAssessment: () => void;
}

const DeleteAssessmentModal = ({
  onDeleteAssessment,
}: DeleteAssessmentModalProps) => {
  const { isLoading } = useAssessmentContext();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="transition-all duration-300 ease-in-out hover:border-white hover:bg-red-500 hover:text-white"
        >
          <Trash size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            assessment and questions related to this assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full grid-cols-2 gap-4">
          <Button
            onClick={() => setOpen(false)}
            disabled={isLoading}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={onDeleteAssessment}
            disabled={isLoading}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAssessmentModal;
