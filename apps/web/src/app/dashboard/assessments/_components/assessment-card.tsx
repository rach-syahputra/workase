'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CircleAlert } from 'lucide-react';

import { IAssessment } from '@/lib/interfaces/assessment';
import { useToast } from '@/hooks/use-toast';
import { useUserStatsContext } from '@/context/user-stats-context';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { ToastAction } from '@/components/shadcn-ui/toast';

interface AssessmentCardProps {
  assessment: IAssessment;
}

interface AssessmentCardToolTipProps {
  content: string;
}

const AssessmentCard = ({ assessment }: AssessmentCardProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { userStats } = useUserStatsContext();

  const isAssessmentDisabled =
    (userStats?.subscription.plan === 'STANDARD' &&
      userStats.subscription.assessmentEnrollmentCount >= 2) ||
    !userStats?.subscription.plan;

  const handleUpgradePlan = async () => {
    router.push('/subscription');
  };

  const handleTakeAssessment = () => {
    if (isAssessmentDisabled) {
      toast({
        title: 'Unable to Take Assessment',
        variant: 'destructive',
        description: 'You have reached assessment enrollment limit.',
        action: (
          <ToastAction onClick={handleUpgradePlan} altText="Subscription page">
            Upgrade Plan
          </ToastAction>
        ),
      });
    } else {
      router.push(`/assessments/${assessment.slug}`);
    }
  };

  return (
    <Card className="group relative flex w-full flex-col items-start justify-center gap-4 overflow-hidden p-4 md:p-5">
      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-2">
          <h3 className="heading-3">{assessment.skill.title}</h3>
          <AssessmentCardToolTip content={assessment.shortDescription} />
        </div>
        <span className="text-primary-gray text-sm">
          Enrolled by {assessment.totalAttemptsByUser} users
        </span>
      </div>
      <Button onClick={handleTakeAssessment} className="max-lg:w-full">
        Take Assessment
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
