'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import { removeSkill } from '@/lib/apis/skill';
import { useToast } from '@/hooks/use-toast';
import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { useAssessmentContext } from '@/context/assessment-context';

interface RemoveSkillDialogProps {
  skillId: string;
}

const RemoveSkillDialog = ({ skillId }: RemoveSkillDialogProps) => {
  const { toast } = useToast();
  const { fetchAvailableSkills } = useCreateAssessmentContext();
  const { fetchGetAssessments } = useAssessmentContext();
  const {
    fetchSkills,
    onRemoveMode,
    setOnRemoveMode,
    isLoading,
    setIsLoading,
  } = useBrowseSkillsContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleRemoveSkill = async () => {
    setIsLoading(true);

    const response = await removeSkill({
      skillId,
    });

    if (response.success) {
      toast({
        title: 'Skill Deleted',
        description: `Skill with id: ${skillId} was successfully deleted.`,
      });

      fetchSkills();
      fetchAvailableSkills();
      fetchGetAssessments();
      setOpen(false);
      setOnRemoveMode(false);
    } else {
      toast({
        title: 'Delete Failed',
        description: 'Something went wrong when deleting skill.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    onRemoveMode && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <X
            size={16}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-500">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              skill and assessments related to this skill.
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
              onClick={handleRemoveSkill}
              disabled={isLoading}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default RemoveSkillDialog;
