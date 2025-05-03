'use client';

import { useState } from 'react';

import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import CreateSkillForm from './create-skill-form';

const CreateSkillModal = () => {
  const { isLoading } = useBrowseSkillsContext();
  const [open, onOpenChange] = useState<boolean>(false);

  const handleCreateSkillModal = () => {
    onOpenChange(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {isLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Button
            type="button"
            variant="dark"
            onClick={handleCreateSkillModal}
            className="w-full md:px-6"
          >
            Create Skill
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-h-svh min-h-[60%] flex-col gap-6 overflow-y-auto sm:max-h-[80vh] sm:max-w-[425px]">
        <DialogHeader className="space-y-0">
          <DialogTitle className="text-xl">Create Skill</DialogTitle>
          <DialogDescription>
            Fill in the details to add a skill.
          </DialogDescription>
        </DialogHeader>
        <CreateSkillForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSkillModal;
