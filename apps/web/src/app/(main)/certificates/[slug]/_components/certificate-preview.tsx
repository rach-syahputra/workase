import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';

interface CertificatePreviewProps {
  certificateUrl: string;
}

interface CertificatePreviewOverlayProps {
  className?: string;
}

const CertificatePreview = ({ certificateUrl }: CertificatePreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger className="h-full w-full">
        <div className="group relative mx-auto aspect-[1056/816] w-full overflow-hidden rounded-md bg-gray-200 md:max-w-[600px]">
          <iframe
            src={`${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
            style={{ pointerEvents: 'none', overflow: 'hidden' }}
            className="pointer-events-none aspect-auto h-full w-full overflow-y-hidden"
          />
          <CertificatePreviewOverlay className="opacity-0 group-hover:opacity-85" />
        </div>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90svh] w-full max-w-[90vw] border-none p-0">
        <iframe src={`${certificateUrl}#zoom=80`} className="h-full w-full" />
      </DialogContent>
    </Dialog>
  );
};

const CertificatePreviewOverlay = ({
  className,
}: CertificatePreviewOverlayProps) => {
  return (
    <div
      className={cn(
        'bg-primary-dark absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-md transition-all duration-300 ease-in-out',
        className,
      )}
    >
      <p className="heading-2 flex h-full w-full items-center justify-center text-white">
        Click to view in full screen
      </p>
    </div>
  );
};

export default CertificatePreview;
