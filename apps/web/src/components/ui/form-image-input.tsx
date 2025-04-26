'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { CircleAlert, Plus } from 'lucide-react';

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
  preview?: string;
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
  preview,
  disabled,
  errorMessage,
  description,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex w-fit items-center justify-center gap-2">
        <Label htmlFor={name}>{label}</Label>
        {description && <FormImageInputToolTip content={description} />}
      </div>
      <div
        onClick={handleClick}
        className="border-input flex aspect-square w-full cursor-pointer select-none items-center justify-center rounded-md border px-2 py-1 text-sm sm:w-[200px]"
      >
        {preview ? (
          <Image
            src={preview}
            alt={name}
            width={500}
            height={500}
            className="aspect-auto w-full object-cover"
          />
        ) : (
          <Plus size={40} className="text-primary-gray" />
        )}
      </div>
      <Input
        ref={fileInputRef}
        type="file"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="sr-only cursor-pointer text-sm"
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
