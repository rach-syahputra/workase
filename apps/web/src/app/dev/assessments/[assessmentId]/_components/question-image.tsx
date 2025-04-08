import Image from 'next/image';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';

interface QuestionImageProps {
  label: string;
  image: string;
}

const QuestionImage = ({ label, image }: QuestionImageProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-primary-dark hover:bg-primary-blue-hover hover:border-primary-blue-hover flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md border px-2 py-1 text-sm transition-all duration-300 ease-in-out hover:text-white">
          <Icon icon={faImage} className="w-4" />
          Image
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            Attached image related to the question.
          </DialogDescription>
        </DialogHeader>
        <Image
          src={image}
          alt="question image"
          width={1000}
          height={1000}
          className="aspect-auto h-full max-h-[90svh]"
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuestionImage;
