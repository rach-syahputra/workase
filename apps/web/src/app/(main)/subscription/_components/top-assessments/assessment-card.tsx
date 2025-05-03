import Image from 'next/image';

import { ITopAssessment } from '@/lib/interfaces/assessment';
import { Card } from '@/components/shadcn-ui/card';

interface AssessmentCardProps {
  number: number;
  assessment: ITopAssessment;
}

const AssessmentCard = ({ number, assessment }: AssessmentCardProps) => {
  return (
    <div className="group flex w-full items-center justify-start gap-4">
      <div className="flex aspect-square w-4 items-center justify-center">
        <span className="text-primary-gray font-medium">{number}.</span>
      </div>
      <Card className="flex aspect-square h-10 w-10 items-center justify-center border">
        <Image
          src={assessment.image}
          alt="Assessment image"
          width={100}
          height={100}
          className="aspect-square w-7 rounded-md object-cover transition-all duration-300 ease-in-out group-hover:brightness-75"
        />
      </Card>
      <div className="flex flex-col items-start">
        <span className="font-medium">{assessment.skill.title}</span>
        <span className="text-primary-gray text-sm">
          {assessment.totalEnrollmentCount} Enrolled
        </span>
      </div>
    </div>
  );
};

export default AssessmentCard;
