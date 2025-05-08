import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { deleteAssessmentQuestion } from '@/lib/apis/assessment-question';
import { useToast } from '@/hooks/use-toast';
import { useAssessmentQuestionContext } from '@/context/assessment-question-context';
import { useBrowseAssessmentQuestionContext } from '@/context/browse-assessment-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';

interface DeleteQuestionModalProps {
  assessmentId: string;
  assessmentQuestionId: string;
}

const DeleteQuestionModal = ({
  assessmentId,
  assessmentQuestionId,
}: DeleteQuestionModalProps) => {
  const { toast } = useToast();
  const { isLoading, setIsLoading, fetchAssessmentBySlug } =
    useAssessmentQuestionContext();
  const { fetchAssessmentQuestions } = useBrowseAssessmentQuestionContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteQuestion = async () => {
    setIsLoading(true);

    const response = await deleteAssessmentQuestion({
      assessmentId,
      assessmentQuestionId,
    });

    if (response.success) {
      setOpen(false);
      fetchAssessmentBySlug();
      fetchAssessmentQuestions({ page: 1 });
      toast({
        title: 'Question Deleted',
        description: 'Question has been deleted successfully.',
      });
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash2
          size={18}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500"
        />
      </DialogTrigger>

      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="text-red-500">Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p>Are you sure you want to delete this question?</p>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              onClick={() => setOpen(false)}
              disabled={isLoading}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteQuestion}
              disabled={isLoading}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteQuestionModal;
