'use client';

import DeveloperCTA from '@/components/developer/developer-cta';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

interface CreateQuestionButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  assessmentSlug: string;
}

const CreateQuestionButton = ({
  isLoading,
  disabled,
  assessmentSlug,
}: CreateQuestionButtonProps) => {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger>
          <DeveloperCTA
            label="Create Question"
            href={`/dev/assessments/${assessmentSlug}/questions/new`}
            isLoading={isLoading}
            disabled={disabled}
            className="py-2 max-sm:w-full"
          />
        </TooltipTrigger>
        {disabled && (
          <TooltipContent>
            <p>Assessment question has reached max limit (25)</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreateQuestionButton;
