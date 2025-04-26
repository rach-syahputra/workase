import { HTMLInputTypeAttribute } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '../shadcn-ui/input';
import { Label } from '../shadcn-ui/label';

interface FormInputProps {
  label?: string;
  labelColor?: 'green' | 'red';
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  labelColor,
  type,
  name,
  value,
  placeholder,
  onChange,
  disabled,
  errorMessage,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label
        htmlFor={name}
        className={cn({
          'text-green-500': labelColor === 'green',
          'text-red-500': labelColor === 'red',
        })}
      >
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
