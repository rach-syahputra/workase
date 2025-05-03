'use client';

import { getIn } from 'formik';
import { Plus, Trash } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Button } from '@/components/shadcn-ui/button';
import FormInput from '@/components/ui/form-input';

interface ExperienceTaskFormProps {
  contentIndex: number;
  tasks: string[];
}

const ExperienceTaskForm = ({
  contentIndex,
  tasks,
}: ExperienceTaskFormProps) => {
  const { toast } = useToast();
  const { formik } = useCvEditFormContext();

  const handleAddExperienceTask = () => {
    const tasks = formik.values.data.experience?.contents[contentIndex]?.tasks;
    const lastTask = tasks?.[tasks.length - 1];

    if (lastTask === '') {
      return toast({
        title: 'Invalid Input',
        variant: 'destructive',
        description: 'Fill the empty task before adding a new one.',
      });
    }

    const newTaskIndex =
      tasks && tasks?.length > 0
        ? formik.values.data.experience?.contents[contentIndex].tasks.length
        : 0;

    formik.setFieldValue(
      `data.experience.contents[${contentIndex}].tasks[${newTaskIndex}]`,
      '',
    );
  };

  const handleRemoveExperienceTask = (taskIndex: number) => {
    const tasks = formik.values.data.experience?.contents[contentIndex].tasks;
    const updatedTasks = [...tasks!];
    updatedTasks?.splice(taskIndex, 1);
    formik.setFieldValue(
      `data.experience.contents[${contentIndex}].tasks`,
      updatedTasks,
    );
    formik.setFieldError(`data.experience.contents[${contentIndex}].tasks`, '');
  };

  return (
    <div className="flex w-full flex-col">
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-center gap-4"
          >
            <FormInput
              type="text"
              labelColor="gray"
              name={`data.experience.contents[${contentIndex}].tasks[${index}]`}
              onChange={formik.handleChange}
              value={task as string}
              className="w-full"
            />
            <Trash
              onClick={() => handleRemoveExperienceTask(index)}
              size={16}
              className="cursor-pointer"
            />
          </div>
        ))}

      {getIn(
        formik.errors,
        `data.experience.contents[${contentIndex}].tasks`,
      ) && (
        <p className="text-sm text-red-500">
          {getIn(
            formik.errors,
            `data.experience.contents[${contentIndex}].tasks`,
          )}
        </p>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => handleAddExperienceTask()}
        className="text-primary-gray mt-4 h-8 min-h-7 w-fit gap-1 border-dashed p-2"
      >
        <Plus size={14} />
        Task
      </Button>
    </div>
  );
};

export default ExperienceTaskForm;
