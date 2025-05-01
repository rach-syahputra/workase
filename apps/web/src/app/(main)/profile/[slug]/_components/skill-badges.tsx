'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useUserDetailContext } from '@/context/user-detail-context';
import { CircleHelp } from 'lucide-react';

const SkillBadges = () => {
  const { user } = useUserDetailContext();

  return (
    <div className="flex w-full flex-col items-start gap-4 p-5">
      <div className="flex items-center justify-center gap-2">
        <h1 className="heading-3">Skill Badges</h1>
        <TooltipProvider delayDuration={0.5}>
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleHelp size={14} className="text-primary-gray" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Badges earned by completing assessments</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex w-full flex-wrap gap-4">
        {user?.badges &&
          user.badges.length > 0 &&
          user.badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center overflow-hidden rounded-md border"
            >
              <TooltipProvider delayDuration={0.5}>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="bg-primary-dark-background select-none px-3 py-2 text-white"
                  >
                    <span>{badge.score}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Assessment Score</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <p className="px-3 py-2">{badge.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillBadges;
