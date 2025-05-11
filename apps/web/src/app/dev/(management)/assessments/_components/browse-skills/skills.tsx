'use client';

import { cn } from '@/lib/utils';
import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import RemoveSkillDialog from './remove-skill-dialog';

interface SkillsProps {
  className?: string;
}

interface SkillCardSkeletonProps {
  className?: string;
}

const Skills = ({ className }: SkillsProps) => {
  const { skills, isLoading } = useBrowseSkillsContext();

  return (
    <div className={cn('flex w-full flex-wrap gap-3', className)}>
      {isLoading ? (
        <>
          <SkillCardSkeleton className="w-1/2" />
          <SkillCardSkeleton className="w-1/4" />
          <SkillCardSkeleton className="w-2/3" />
          <SkillCardSkeleton className="w-1/5" />
          <SkillCardSkeleton className="w-1/4" />
        </>
      ) : (
        skills?.map((skill, index) => (
          <Card
            key={index}
            className="flex items-center justify-center gap-2 rounded-full px-4 py-2"
          >
            <span>{skill.title}</span>
            <RemoveSkillDialog skillId={skill.id} />
          </Card>
        ))
      )}
    </div>
  );
};

const SkillCardSkeleton = ({ className }: SkillCardSkeletonProps) => {
  return <Skeleton className={cn('h-9 w-1/2 rounded-full', className)} />;
};

export default Skills;
