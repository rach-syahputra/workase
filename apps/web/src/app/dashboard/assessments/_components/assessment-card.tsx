import Image from 'next/image';
import Link from 'next/link';
import { CircleAlert } from 'lucide-react';

import { IAssessment } from '@/lib/interfaces/assessment';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

interface AssessmentCardProps {
  assessment: IAssessment;
}

interface AssessmentCardToolTipProps {
  content: string;
}

const AssessmentCard = ({ assessment }: AssessmentCardProps) => {
  return (
    <Card className="group relative flex w-full flex-col items-start justify-center gap-4 overflow-hidden p-4 md:p-5">
      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-2">
          <h3 className="heading-3">{assessment.skill.title}</h3>
          <AssessmentCardToolTip content={assessment.shortDescription} />
        </div>
        <span className="text-primary-gray text-sm">
          Taken by {assessment.totalAttemptsByUser} users
        </span>
      </div>
      <Button asChild className="max-lg:w-full">
        <Link
          href={`/assessments/${assessment.slug}`}
          aria-label={assessment.skill.title}
        >
          Take Assessment
        </Link>
      </Button>
      <Image
        src={assessment.image}
        alt="image"
        width={400}
        height={400}
        className="absolute bottom-0 right-0 aspect-auto w-[90px] object-cover opacity-50 transition-all duration-150 ease-in-out group-hover:opacity-100 group-hover:brightness-95 max-xl:hidden"
      />
    </Card>
  );
};

const AssessmentCardToolTip = ({ content }: AssessmentCardToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <CircleAlert size={16} className="text-primary-gray" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-3 text-sm">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AssessmentCard;
