'use client';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import CvPreviewTemplateOne from '@/components/cv-preview/cv-preview-template-one';
import CvPreviewTemplateTwo from '@/components/cv-preview/cv-preview-template-two';

interface CvPreviewSectionProps {
  className?: string;
}

const CvPreviewSection = ({ className }: CvPreviewSectionProps) => {
  const { cvData } = useCvEditFormContext();

  return cvData?.template === 2 ? (
    <CvPreviewTemplateTwo className={className} />
  ) : cvData?.template === 1 ? (
    <CvPreviewTemplateOne className={className} />
  ) : (
    <CvPreviewTemplateOne className={className} />
  );
};

export default CvPreviewSection;
