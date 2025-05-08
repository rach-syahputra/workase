'use client';

import dynamic from 'next/dynamic';
import { ArrowDownToLine, Columns, Palette } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import CvPreviewPdf from '@/components/cv-preview/cv-preview-pdf';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import AppLogo from '@/components/ui/app-logo';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import SaveChangesButton from '../save-changes-button';
import Profile from './profile';
import Menu from './menu';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-[83px]" />,
  },
);

const CvEditTopBar = () => {
  const { showPreview, setShowPreview, cvData } = useCvEditFormContext();

  return (
    <nav className="border-primary-gray-background fixed z-50 flex h-16 w-full items-center justify-center border-b bg-white">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-4">
        <div className="flex h-full items-center justify-center gap-4">
          <AppLogo />
          <Separator
            orientation="vertical"
            className="w-[0.5px] max-lg:hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className={cn(
              'border-border flex items-center justify-center gap-2 hover:bg-white max-lg:hidden',
              {
                'bg-primary-gray-background hover:bg-primary-gray-background':
                  showPreview,
              },
            )}
          >
            <Columns size={16} />
            Preview Mode
          </Button>
        </div>

        <div className="flex h-full items-center justify-center gap-4">
          <div className="flex h-full items-center justify-center gap-2">
            <SaveChangesButton className="max-lg:hidden" />

            <PDFDownloadLink
              document={
                <CvPreviewPdf
                  cv={{ slug: cvData?.slug || '', data: cvData?.data! }}
                />
              }
              fileName={`CV-${cvData?.data.header?.content.name}-${cvData?.data.header?.content.role}.pdf`}
              className="max-lg:hidden"
            >
              {() => (
                <Button type="button" variant="secondary">
                  <ArrowDownToLine size={16} />
                  PDF
                </Button>
              )}
            </PDFDownloadLink>
          </div>
          <Separator
            orientation="vertical"
            className="w-[0.5px] max-lg:hidden"
          />
          <Profile className="max-lg:hidden" />
        </div>

        <div className="flex items-center justify-center gap-4 lg:hidden">
          <SaveChangesButton className="max-md:hidden lg:hidden" />
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default CvEditTopBar;
