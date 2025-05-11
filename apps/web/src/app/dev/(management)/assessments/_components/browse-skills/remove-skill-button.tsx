'use client';

import { Trash } from 'lucide-react';

import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { cn } from '@/lib/utils';

const RemoveSkillButton = () => {
  const { isLoading, onRemoveMode, setOnRemoveMode } = useBrowseSkillsContext();

  return isLoading ? (
    <Skeleton className="h-9 w-[50px]" />
  ) : (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setOnRemoveMode(!onRemoveMode)}
            className={cn(
              'hover:border-white hover:bg-red-500 hover:text-white',
              {
                'border-white bg-red-500 text-white': onRemoveMode,
              },
            )}
          >
            <Trash size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Turn on remove mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RemoveSkillButton;
