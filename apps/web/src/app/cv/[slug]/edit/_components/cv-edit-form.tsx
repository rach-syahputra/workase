'use client';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Separator } from '@/components/shadcn-ui/separator';
import CvEditTopBar from './top-bar/cv-edit-top-bar';
import HeaderForm from './header-form';
import SummaryForm from './summary-form';
import ExperienceForm from './experience-form';
import EducationForm from './education-form';
import SkillForm from './skill-form';
import SaveChangesButton from './save-changes-button';
import GeneratedSummary from './generated-summary';
import CvPreviewSection from './cv-preview-section';

const CvEditForm = () => {
  const { formik, showPreview, isComparingSummary } = useCvEditFormContext();

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative min-h-screen w-screen"
    >
      <CvEditTopBar />

      <div
        className={cn(
          'mx-auto mb-4 mt-20 flex w-full max-w-screen-md flex-col items-start pb-14 md:pb-0 lg:grid',
          {
            'gap-y-8 lg:max-w-screen-xl lg:grid-cols-2':
              (showPreview && !isComparingSummary) ||
              (!showPreview && isComparingSummary),
          },
        )}
      >
        <div className="flex w-full flex-col gap-6 px-4 md:gap-4">
          {!isComparingSummary && <HeaderForm />}
          <Separator className="md:hidden" />
          <SummaryForm />
          <Separator className="md:hidden" />
          {!isComparingSummary && <EducationForm />}
          <Separator className="md:hidden" />
          {!isComparingSummary && <ExperienceForm />}
          <Separator className="md:hidden" />
          {!isComparingSummary && <SkillForm />}
        </div>
        <GeneratedSummary
          className={cn('lg:sticky lg:top-20', {
            hidden: !isComparingSummary || showPreview,
          })}
        />
        <CvPreviewSection
          className={cn('lg:sticky lg:top-20', {
            hidden: !showPreview || isComparingSummary,
          })}
        />
      </div>

      <div className="border-border fixed bottom-0 w-full rounded-md border-t bg-white p-3 md:hidden">
        <SaveChangesButton className="w-full" />
      </div>
    </form>
  );
};

export default CvEditForm;
