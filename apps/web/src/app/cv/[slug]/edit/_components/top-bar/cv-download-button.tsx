'use client';

import dynamic from 'next/dynamic';
import { ArrowDownToLine } from 'lucide-react';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
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

const CvDownloadButton = () => {
  const { cvData } = useCvEditFormContext();

  return (
    <PDFDownloadLink
      document={
        cvData?.template === 2 ? (
          <CvPreviewTemplateTwoPdf
            cv={{ slug: cvData?.slug || '', data: cvData?.data! }}
          />
        ) : cvData?.template === 1 ? (
          <CvPreviewTemplateOnePdf
            cv={{ slug: cvData?.slug || '', data: cvData?.data! }}
          />
        ) : (
          <CvPreviewTemplateOnePdf
            cv={{ slug: cvData?.slug || '', data: cvData?.data! }}
          />
        )
      }
      fileName={`CV-${cvData?.data.header?.content.name}-${cvData?.data.header?.content.role}.pdf`}
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
