'use client';

import React from 'react';
import { getIn } from 'formik';
import { Plus } from 'lucide-react';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import FormInput from '@/components/ui/form-input';
import { Separator } from '@/components/shadcn-ui/separator';
import { Button } from '@/components/shadcn-ui/button';
import ContentAction from './content-action';
import ExperienceTaskForm from './experience-task-form';

const ExperienceForm = () => {
  const { formik } = useCvEditFormContext();

  const handleAddExperience = () => {
    const experience = formik.values.data.experience;

    formik.setFieldValue('data.experience.contents', [
      ...(experience?.contents || []),
      {},
    ]);
  };

  const handleRemoveExperience = (contentIndex: number) => {
    const contents = formik.values.data.experience?.contents;
    const updatedContents = [...contents!];
    updatedContents?.splice(contentIndex, 1);
    formik.setFieldValue('data.experience.contents', updatedContents);
  };

  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="text-xl font-bold">Experience</h2>

      {formik.values.data.experience?.contents?.map((content, index) => (
        <Card key={index} className="flex flex-col">
          <div className="flex items-start justify-between gap-4 p-4">
            <h3 className="font-bold">Experience {index + 1}</h3>
            <ContentAction onRemove={() => handleRemoveExperience(index)} />
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 p-4">
            <FormInput
              type="text"
              labelColor="gray"
              name={`data.experience.contents[${index}].role`}
              label="Role"
              onChange={formik.handleChange}
              value={content.role as string}
              errorMessage={getIn(
                formik.errors,
                `data.experience.contents[${index}].role`,
              )}
            />
            <FormInput
              type="text"
              labelColor="gray"
              name={`data.experience.contents[${index}].company`}
              label="Company / Institution"
              onChange={formik.handleChange}
              value={content.company as string}
              errorMessage={getIn(
                formik.errors,
                `data.experience.contents[${index}].company`,
              )}
            />
            <FormInput
              type="text"
              labelColor="gray"
              name={`data.experience.contents[${index}].startDate`}
              label="Start Year"
              onChange={formik.handleChange}
              value={content.startDate as string}
              errorMessage={getIn(
                formik.errors,
                `data.experience.contents[${index}].startDate`,
              )}
            />
            <FormInput
              type="text"
              labelColor="gray"
              name={`data.experience.contents[${index}].endDate`}
              label="End Year"
              onChange={formik.handleChange}
              value={content.endDate as string}
              errorMessage={getIn(
                formik.errors,
                `data.experience.contents[${index}].endDate`,
              )}
            />

            <div className="col-span-2 flex flex-col">
              <span className="text-primary-gray text-sm font-medium">
                Tasks
              </span>
              <ExperienceTaskForm tasks={content.tasks} contentIndex={index} />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAddExperience}
        className="text-primary-gray w-fit gap-1 border-dashed"
      >
        <Plus size={16} />
        Experience
      </Button>
    </Card>
  );
};

export default ExperienceForm;
