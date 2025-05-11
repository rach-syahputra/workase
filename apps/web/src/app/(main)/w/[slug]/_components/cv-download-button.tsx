'use client';

import dynamic from 'next/dynamic';
import { ArrowDownToLine } from 'lucide-react';

import { ICv } from '@/lib/interfaces/cv';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import CvPreviewTemplateOnePdf from '@/components/cv-preview/cv-preview-template-one/pdf';
import CvPreviewTemplateTwoPdf from '@/components/cv-preview/cv-preview-template-two/pdf';
import { Button } from '@/components/shadcn-ui/button';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-[83px]" />,
  },
);

interface CvDownloadButtonProps {
  cv: ICv;
}

const CvDownloadButton = ({ cv }: CvDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={
        cv?.template === 2 ? (
          <CvPreviewTemplateTwoPdf
            cv={{ slug: cv?.slug || '', data: cv?.data! }}
          />
        ) : cv?.template === 1 ? (
          <CvPreviewTemplateOnePdf
            cv={{ slug: cv?.slug || '', data: cv?.data! }}
          />
        ) : (
          <CvPreviewTemplateOnePdf
            cv={{ slug: cv?.slug || '', data: cv?.data! }}
          />
        )
      }
      fileName={`CV-${cv?.data.header?.content.name}-${cv?.data.header?.content.role}.pdf`}
      className="max-lg:hidden"
    >
      {() => (
        <Button type="button" variant="secondary">
          <ArrowDownToLine size={16} />
          Download
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default CvDownloadButton;
