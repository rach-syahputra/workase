'use client';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../shadcn-ui/select';
import { Label } from '../shadcn-ui/label';

interface FormSelectInputProps {
  label: string;
  selectLabel: string;
  name: string;
  onChange: (e: string) => void;
  values: {
    id: string;
    label: string;
  }[];
  className?: string;
}

const FormSelectInput = ({
  label,
  selectLabel,
  onChange,
  name,
  values,
  className,
}: FormSelectInputProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={name}>{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={values[0].label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{selectLabel}</SelectLabel>
            {values.map((value, index) => (
              <SelectItem key={index} value={value.id}>
                {value.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelectInput;
