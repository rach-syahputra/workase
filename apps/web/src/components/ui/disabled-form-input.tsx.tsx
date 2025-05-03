import { HTMLInputTypeAttribute } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '../shadcn-ui/input';
import { Label } from '../shadcn-ui/label';

interface DisabledFormInputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  className?: string;
}

const DisabledFormInput: React.FC<DisabledFormInputProps> = ({
  label,
  type,
  name,
  value,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} value={value} disabled />
    </div>
  );
};

export default DisabledFormInput;
