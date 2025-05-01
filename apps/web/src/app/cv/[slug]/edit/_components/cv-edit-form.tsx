'use client';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import CvEditTopBar from './top-bar/cv-edit-top-bar';
import HeaderForm from './header-form';
import SummaryForm from './summay-form';
import ExperienceForm from './experience-form';
import EducationForm from './education-form';
import SkillForm from './skill-form';
import CvPreviewTemplateOne from './cv-preview/cv-preview-template-one';
import SaveChangesButton from './save-changes-button';

const CvEditForm = () => {
  const { formik, showPreview } = useCvEditFormContext();

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
            'gap-y-8 lg:max-w-screen-xl lg:grid-cols-2': showPreview,
          },
        )}
      >
        <div className="flex w-full flex-col gap-4 px-4">
          <HeaderForm />
          <SummaryForm />
          <ExperienceForm />
          <EducationForm />
          <SkillForm />
        </div>
        <CvPreviewTemplateOne
          className={cn('lg:sticky lg:top-20', {
            hidden: !showPreview,
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
