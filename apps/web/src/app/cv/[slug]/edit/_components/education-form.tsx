'use client';

import React from 'react';
import { Plus } from 'lucide-react';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import FormInput from '@/components/ui/form-input';
import { Separator } from '@/components/shadcn-ui/separator';
import { Button } from '@/components/shadcn-ui/button';
import ContentAction from './content-action';

const EducationForm = () => {
  const { formik } = useCvEditFormContext();

  const handleAddEducation = () => {
    const education = formik.values.data.education;

    formik.setFieldValue('data.education.contents', [
      ...(education?.contents || []),
      {},
    ]);
  };

  const handleRemoveContent = (contentIndex: number) => {
    const contents = formik.values.data.education?.contents;

    if (contents && contents?.length > 1) {
      const updatedContents = [...contents];
      updatedContents?.splice(contentIndex, 1);
      formik.setFieldValue(`data.education.contents`, updatedContents);
    } else {
      formik.setFieldValue(`data.education.contents`, []);
    }
  };

  return (
    <Card className="flex flex-col gap-4 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="text-xl font-bold">Education</h2>

      {formik.values.data.education?.contents?.map((content, index) => (
        <React.Fragment key={index}>
          <Card className="flex flex-col">
            <div className="flex items-start justify-between gap-4 p-4">
              <h3 className="font-bold">Education {index + 1}</h3>
              <ContentAction onRemove={() => handleRemoveContent(index)} />
            </div>
            <Separator />
            <div className="flex flex-col gap-x-4 gap-y-6 p-4 md:grid md:grid-cols-2">
              <FormInput
                type="text"
                labelColor="gray"
                name={`data.education.contents[${index}].major`}
                label="Major"
                onChange={formik.handleChange}
                value={content.major as string}
              />
              <FormInput
                type="text"
                labelColor="gray"
                name={`data.education.contents[${index}].institution`}
                label="Institution"
                onChange={formik.handleChange}
                value={content.institution as string}
              />
              <FormInput
                type="text"
                labelColor="gray"
                name={`data.education.contents[${index}].startDate`}
                label="Start Year"
                onChange={formik.handleChange}
                value={content.startDate as string}
              />
              <FormInput
                type="text"
                labelColor="gray"
                name={`data.education.contents[${index}].endDate`}
                label="End Year"
                onChange={formik.handleChange}
                value={content.endDate as string}
              />
            </div>
          </Card>
        </React.Fragment>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAddEducation}
        className="text-primary-gray w-fit gap-1 border-dashed"
      >
        <Plus size={16} />
        Education
      </Button>
    </Card>
  );
};

export default EducationForm;
