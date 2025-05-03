import { useState } from 'react';
import { AlignJustify } from 'lucide-react';

import { cn, formatAssessmentDate } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';
import AppLogo from '@/components/ui/app-logo';
import { Separator } from '@/components/shadcn-ui/separator';

interface AssessmentSessionDrawerItemProps {
  title: string;
  value: string;
  className?: string;
}

const AssessmentSessionDrawer = () => {
  const { userAssessment } = useAssessmentSessionContext();
  const [open, onOpenChange] = useState<boolean>(false);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerTrigger className="lg:hidden">
        <div className="flex aspect-square h-10 w-10 items-center justify-center">
          <AlignJustify />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen gap-4 px-4">
        <AppLogo className="w-24" />
        <Separator />
        <div className="flex flex-col items-center justify-start gap-8 sm:gap-4">
          <AssessmentSessionDrawerItem
            title="Assessment Title:"
            value={userAssessment?.assessment.skillTitle || ''}
          />
          <AssessmentSessionDrawerItem
            title="Assessment Date:"
            value={formatAssessmentDate(
              new Date(userAssessment?.assessment.date || ''),
            )}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const AssessmentSessionDrawerItem = ({
  title,
  value,
  className,
}: AssessmentSessionDrawerItemProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <div
        className={cn(
          'flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center',
          className,
        )}
      >
        <span className="text-primary-gray line-clamp-1 text-xs md:text-sm">
          {title}
        </span>
        <span className="line-clamp-1 text-sm font-bold">{value}</span>
      </div>
    </div>
  );
};

export default AssessmentSessionDrawer;
