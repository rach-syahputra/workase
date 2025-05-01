'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';

const SkillForm = () => {
  const { toast } = useToast();
  const { formik } = useCvEditFormContext();
  const skills = formik.values.data.skill?.contents;
  const skillInputRef = useRef<HTMLInputElement>(null);
  const [showSkillInput, setShowSkillInput] = useState<boolean>(false);
  const [skillValue, setSkillValue] = useState<string>('');

  const handleAddSkill = () => {
    if (skillValue === '') {
      toast({
        title: 'Invalid Input',
        variant: 'destructive',
        description: 'Skill field cannot be empty.',
      });
      return skillInputRef.current?.focus();
    }

    const newTaskIndex =
      skills && skills?.length > 0
        ? formik.values.data.skill?.contents.length
        : 0;

    formik.setFieldValue(`data.skill.contents[${newTaskIndex}]`, skillValue);
    setShowSkillInput(false);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills!];
    updatedSkills?.splice(index, 1);
    formik.setFieldValue(`data.skill.contents`, updatedSkills);
    formik.setFieldError(`data.skill.contents`, '');
  };

  useEffect(() => {
    if (showSkillInput) {
      skillInputRef.current?.focus();
    } else {
      setSkillValue('');
    }
  }, [showSkillInput]);

  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="text-xl font-bold">Skill</h2>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {skills &&
          skills.length > 0 &&
          skills.map((skill, index) => (
            <Card key={index} className="flex items-center justify-center">
              <span className="py-2 pl-4 pr-2">{skill}</span>
              <div
                onClick={() => handleRemoveSkill(index)}
                className="group flex cursor-pointer items-center justify-center py-2 pl-2 pr-4"
              >
                <X
                  size={16}
                  className="transition-all duration-300 ease-in-out group-hover:text-red-500"
                />
              </div>
            </Card>
          ))}
      </div>
      {showSkillInput && (
        <div className="flex w-full items-center justify-start gap-2">
          <Input
            ref={skillInputRef}
            value={skillValue}
            onChange={(e) => setSkillValue(e.target.value)}
            className="w-full"
          />
          <Button type="button" onClick={handleAddSkill} className="px-8">
            Add Skill
          </Button>
          <Button
            type="button"
            onClick={() => setShowSkillInput(false)}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      )}
      {!showSkillInput && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowSkillInput(true)}
          className="text-primary-gray w-fit gap-1 border-dashed"
        >
          <Plus size={16} />
          Skill
        </Button>
      )}
    </Card>
  );
};

export default SkillForm;
