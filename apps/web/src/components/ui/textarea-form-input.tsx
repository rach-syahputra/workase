import { cn } from '@/lib/utils';
import { Label } from '../shadcn-ui/label';
import { Textarea } from '../shadcn-ui/textarea';

interface TextareaFormInputProps {
  label: string;
  labelColor?: 'green' | 'red' | 'gray';
  name: string;
  placeholder?: string;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
}

const TextareaFormInput: React.FC<TextareaFormInputProps> = ({
  label,
  labelColor,
  name,
  placeholder,
  rows = 4,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={name}
        className={cn({
          'text-green-500': labelColor === 'green',
          'text-red-500': labelColor === 'red',
          'text-primary-gray': labelColor === 'gray',
        })}
      >
        {label}
      </Label>
      <Textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default TextareaFormInput;
