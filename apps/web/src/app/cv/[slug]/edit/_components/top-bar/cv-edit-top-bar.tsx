'use client';

import { Columns } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Button } from '@/components/shadcn-ui/button';
import { Separator } from '@/components/shadcn-ui/separator';
import AppLogo from '@/components/ui/app-logo';
import SaveChangesButton from '../save-changes-button';
import Profile from './profile';
import Menu from './menu';
import TemplateSheet from './template-sheet';
import CvDownloadButton from './cv-download-button';

const CvEditTopBar = () => {
  const { showPreview, setShowPreview, isComparingSummary } =
    useCvEditFormContext();

  return (
    <nav className="border-primary-gray-background fixed z-50 flex h-16 w-full items-center justify-center border-b bg-white">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-4">
        <div className="flex h-full items-center justify-center gap-4">
          <AppLogo className="max-md:hidden" />
          <Separator
            orientation="vertical"
            className="w-[0.5px] max-lg:hidden"
          />
          <div className="flex items-center justify-center gap-2">
            <TemplateSheet />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              disabled={isComparingSummary}
              className={cn(
                'border-border flex items-center justify-center gap-2 hover:bg-white',
                {
                  'bg-primary-gray-background hover:bg-primary-gray-background':
                    showPreview,
                },
              )}
            >
              <Columns size={16} />
              <span className="max-sm:hidden">Preview Mode</span>
            </Button>
          </div>
        </div>

        <div className="flex h-full items-center justify-center gap-4">
          <div className="flex h-full items-center justify-center gap-2">
            <SaveChangesButton className="max-lg:hidden" />

            <CvDownloadButton />
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
