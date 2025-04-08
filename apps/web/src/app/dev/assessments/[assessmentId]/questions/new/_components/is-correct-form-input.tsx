import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

interface IsCorrectFormInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string | number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const IsCorrectFormInput: React.FC<IsCorrectFormInputProps> = ({
  label,
  name,
  value,
  checked,
  placeholder,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className="sr-only">
        {label}
      </Label>
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger className="mt-6 flex h-8 w-8 items-center justify-center">
            <Input
              type="radio"
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              checked={checked}
              disabled={disabled}
              className="accent-primary-blue aspect-square h-4 w-4 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="bottom-0">
            <p>Correct Option</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default IsCorrectFormInput;
