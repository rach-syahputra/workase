'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Palette } from 'lucide-react';

import { cn } from '@/lib/utils';
import { TEMPLATE_ITEMS } from '@/lib/constants/cv';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';

interface TemplateItemProps {
  src: string;
  onClick: () => void;
  isActive: boolean;
}

const TemplateSheet = () => {
  const { cvData, setCvData, formik, isComparingSummary } =
    useCvEditFormContext();
  const [selectedTemplate, setSelectedTemplate] = useState<number>(
    cvData?.template || 1,
  );
  const [appliedTemplate, setAppliedTemplate] = useState<number>(
    cvData?.template || 1,
  );

  const handleApply = () => {
    if (cvData) {
      setCvData((prev) => ({
        ...prev!,
        template: selectedTemplate,
      }));
    }
    setAppliedTemplate(selectedTemplate);
    formik.setFieldValue('template', selectedTemplate);
  };

  useEffect(() => {
    setSelectedTemplate(appliedTemplate);
  }, [appliedTemplate]);

  return (
    <Drawer
      direction="left"
      onClose={() => setSelectedTemplate(appliedTemplate)}
    >
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={isComparingSummary}
          className="border-border flex items-center justify-center gap-2"
        >
          <Palette size={16} />
          <span className="max-sm:hidden">Template</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit min-h-screen max-w-fit overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Choose CV Template</DrawerTitle>
          <DrawerDescription>
            Select a template that best showcases your experience and style.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid w-fit grid-cols-2 gap-4 overflow-y-auto px-4 sm:grid-cols-3">
          {TEMPLATE_ITEMS.map((item) => (
            <TemplateItem
              key={item.id}
              onClick={() => setSelectedTemplate(item.value)}
              src={item.src}
              isActive={selectedTemplate === item.value}
            />
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" onClick={handleApply} className="w-full">
              Apply
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const TemplateItem = ({ src, onClick, isActive }: TemplateItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'aspect-auto w-full cursor-pointer overflow-hidden rounded-md border shadow transition-all duration-300 ease-in-out md:h-[339,48px] md:w-[240px]',
        {
          'border-primary-blue shadow-primary-blue': isActive,
        },
      )}
    >
      <Image
        src={src}
        alt="Cv template"
        width={400}
        height={565.81}
        className="rounded-md object-cover"
      />
    </div>
  );
};

export default TemplateSheet;
