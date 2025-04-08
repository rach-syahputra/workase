'use client';

import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { Button } from '@/components/shadcn-ui/button';

interface SkillCardProps {
  id: string;
  title: string;
}

const SkillCard = ({ id, title }: SkillCardProps) => {
  const { isSubmitting, setSelectedSkillId } = useCreateAssessmentContext();

  return (
    <div className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
      <p>{title}</p>
      <Button
        type="button"
        variant="dark"
        onClick={() => setSelectedSkillId(id)}
        disabled={isSubmitting}
        className="px-12"
      >
        Create
      </Button>
    </div>
  );
};

export default SkillCard;
