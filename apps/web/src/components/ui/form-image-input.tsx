import { CircleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '../shadcn-ui/input';
import { Label } from '../shadcn-ui/label';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../shadcn-ui/tooltip';

interface FormImageInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

interface FormImageInputToolTipProps {
  content: string;
}

const FormImageInput: React.FC<FormImageInputProps> = ({
  label,
  name,
  placeholder,
  onChange,
  disabled,
  errorMessage,
  description,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex w-fit items-center justify-center gap-2">
        <Label htmlFor={name}>{label}</Label>
        {description && <FormImageInputToolTip content={description} />}
      </div>
      <Input
        type="file"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="cursor-pointer"
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

const FormImageInputToolTip = ({ content }: FormImageInputToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <CircleAlert size={12} className="text-primary-gray" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-3 text-sm">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FormImageInput;
