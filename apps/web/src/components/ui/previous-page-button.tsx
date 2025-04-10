'use client';

import { useRouter } from 'next/navigation';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { Button } from '../shadcn-ui/button';
import Icon from './icon';

interface PreviousPageButtonProps {
  label: string;
  className?: string;
}

const PreviousPageButton = ({ label, className }: PreviousPageButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      className={cn('flex items-center justify-center gap-2', className)}
    >
      <Icon icon={faChevronLeft} className="w-4" />
      {label}
    </Button>
  );
};

export default PreviousPageButton;
