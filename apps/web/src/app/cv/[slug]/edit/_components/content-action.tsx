import { Ellipsis } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';

interface ContentActionProps {
  onRemove: () => void;
}

const ContentAction = ({ onRemove }: ContentActionProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Ellipsis size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={onRemove}
          className="cursor-pointer text-red-500"
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ContentAction;
