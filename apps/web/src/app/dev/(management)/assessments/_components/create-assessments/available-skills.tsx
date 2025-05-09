import React from 'react';

import { cn } from '@/lib/utils';
import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import AppPagination from '@/components/ui/pagination';
import AvailableSkillCardSkeleton from './available-skill-card-skeleton';
import AvailableSkillCard from './available-skill-card';

interface SkillsProps {
  className?: string;
}

const AvailableSkills = ({ className }: SkillsProps) => {
  const { isLoading, page, skills, setPage, totalPages } =
    useCreateAssessmentContext();

  return (
    <Card
      className={cn(
        'flex w-full items-start justify-center max-md:border-none max-md:shadow-none md:min-h-[410px] md:p-4',
        className,
      )}
    >
      <div className="flex h-full w-full flex-col justify-between gap-4">
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
          </>
        ) : (
          <div className="text-primary-gray flex h-full w-full items-center justify-center">
            No available skills.
          </div>
        )}
        {totalPages > 1 && (
          <AppPagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
            disabled={isLoading}
            className="mt-2"
          />
        )}
      </div>
    </Card>
  );
};

export default AvailableSkills;
