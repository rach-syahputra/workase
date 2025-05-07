'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { Eye } from 'lucide-react';

import { useUserDetailContext } from '@/context/user-detail-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import CvPreviewPdf from '@/components/cv-preview/cv-preview-pdf';
import { Button } from '@/components/shadcn-ui/button';

const CvPreviewModal = () => {
  const { user } = useUserDetailContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Eye size={14} />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full w-full max-w-[90vw] overflow-y-hidden border-none bg-transparent p-0 py-6">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">CV Preview</DialogTitle>
          <DialogDescription className="sr-only">CV Preview</DialogDescription>
        </DialogHeader>
        {user?.cv ? (
          <PDFViewer className="h-full w-full">
            <CvPreviewPdf cv={user?.cv} />
          </PDFViewer>
        ) : (
          <div className="p-10">No CV.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CvPreviewModal;
