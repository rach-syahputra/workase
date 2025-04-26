'use client';

import CreateAssessmentModal from './create-assessment-modal';

interface AvailableSkillCardProps {
  id: string;
  title: string;
}

const AvailableSkillCard = ({ id, title }: AvailableSkillCardProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-3 md:flex-row">
      <div>
        <p className="line-clamp-1">{title}</p>
      </div>
      <CreateAssessmentModal id={id} title={title} />
    </div>
  );
};

export default AvailableSkillCard;
