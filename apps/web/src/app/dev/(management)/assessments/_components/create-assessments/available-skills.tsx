import React from 'react';

import { cn } from '@/lib/utils';
import { ISkill } from '@/lib/interfaces/skill';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import AppPagination from '@/components/ui/pagination';
import AvailableSkillCardSkeleton from './available-skill-card-skeleton';
import AvailableSkillCard from './available-skill-card';

interface SkillsProps {
  skills: ISkill[];
  isLoading?: boolean;
  className?: string;
}

const AvailableSkills = ({ skills, isLoading, className }: SkillsProps) => {
  const { fetchSkills, page, totalPages } = useCreateAssessmentContext();

  return (
    <Card
      className={cn(
        'flex min-h-[410px] w-full items-center justify-center max-md:border-none max-md:shadow-none md:p-4',
        className,
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-between gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <AvailableSkillCardSkeleton />
              {index !== 4 && <Separator />}
            </React.Fragment>
          ))
        ) : skills?.length > 0 ? (
          <>
            <div className="flex w-full flex-col items-center justify-start gap-4">
              {skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <AvailableSkillCard id={skill.id} title={skill.title} />
                  {index !== skills.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
            {totalPages > 1 && (
              <AppPagination
                page={page}
                onPageChange={fetchSkills}
                totalPages={totalPages}
                className="mt-2"
              />
            )}
          </>
        ) : (
          <div className="text-primary-gray flex h-full w-full items-center justify-center">
            No available skills.
          </div>
        )}
      </div>
    </Card>
  );
};

export default AvailableSkills;
