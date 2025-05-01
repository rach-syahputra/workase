'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  AlignJustify,
  ArrowDownToLine,
  Columns,
  Home,
  Palette,
  User,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import AppLogo from '@/components/ui/app-logo';
import { Separator } from '@/components/shadcn-ui/separator';
import CvPreviewPdf from '../cv-preview/cv-preview-pdf';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-[83px]" />,
  },
);

const Menu = () => {
  const { showPreview, setShowPreview, cvData } = useCvEditFormContext();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <AlignJustify size={20} />
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader>
          <DrawerTitle className="sr-only">CV Form Menu</DrawerTitle>
          <DrawerDescription className="sr-only">
            CV Form Menu
          </DrawerDescription>
          <div className="flex w-full flex-col gap-4">
            <AppLogo />
            <div className="flex w-full flex-col">
              <h2 className="text-primary-gray mx-auto my-2 text-sm">
                Navigation
              </h2>
              <Button variant="ghost" asChild className="h-14">
                <Link href="/">
                  <Home size={16} />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild className="h-14">
                <Link href="/profile">
                  <User size={16} />
                  My Profile
                </Link>
              </Button>
            </div>
            <Separator />
            <div className="flex w-full flex-col">
              <h2 className="text-primary-gray mx-auto my-2 text-sm">
                CV Tools
              </h2>
              <Button
                type="button"
                variant="ghost"
                className="border-border flex h-14 items-center justify-center gap-2"
              >
                <Palette size={16} />
                Template
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowPreview(!showPreview);
                  setOpen(false);
                }}
                className={cn(
                  'border-border flex h-14 items-center justify-center gap-2 hover:bg-white',
                  {
                    'bg-primary-gray-background hover:bg-primary-gray-background':
                      showPreview,
                  },
                )}
              >
                <Columns size={16} />
                Preview Mode
              </Button>

              <PDFDownloadLink
                document={
                  <CvPreviewPdf
                    cv={{ slug: cvData?.slug || '', data: cvData?.data! }}
                  />
                }
                fileName={`CV-${cvData?.data.header?.content.name}-${cvData?.data.header?.content.role}.pdf`}
                className="w-full"
              >
                {() => (
                  <Button type="button" variant="ghost" className="h-14 w-full">
                    <ArrowDownToLine size={16} />
                    Download Your CV
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
