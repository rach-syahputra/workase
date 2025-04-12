'use client';

import CreateAssessmentModal from './create-assessment-modal';

interface SkillCardProps {
  id: string;
  title: string;
}

const SkillCard = ({ id, title }: SkillCardProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-3 md:flex-row">
      <div>
        <p className="line-clamp-1">{title}</p>
      </div>
      <CreateAssessmentModal id={id} title={title} />
    </div>
  );
};

export default SkillCard;
