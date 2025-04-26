import React from 'react';

import { cn } from '@/lib/utils';

interface AssessmentSessionCardProps {
  children: React.ReactNode;
  className?: string;
}

const AssessmentSessionCard = ({
  children,
  className,
}: AssessmentSessionCardProps) => {
  return (
    <div
      className={cn(
        'md:border-border rounded-md p-4 md:border md:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AssessmentSessionCard;
