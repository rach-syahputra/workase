'use client';

import CreateAssessmentModal from './create-assessment-modal';

interface SkillCardProps {
  id: string;
  title: string;
}

const SkillCard = ({ id, title }: SkillCardProps) => {
  return (
    <div className="flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
      <p>{title}</p>
      <CreateAssessmentModal id={id} title={title} />
    </div>
  );
};

export default SkillCard;
