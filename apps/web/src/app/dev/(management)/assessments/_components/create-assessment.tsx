'use client';

import { useEffect } from 'react';

import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { Card } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import CreateAssessmentForm from './create-assessment-form';

const CreateAssessment = () => {
  const { fetchSkills, searchSkill, setSearchSkill } =
    useCreateAssessmentContext();

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 md:p-5">
      <h2 className="heading-4 font-semibold">Create Assessment</h2>
      <Input
        type="text"
        placeholder="Search skills..."
        onChange={(e) => setSearchSkill(e.target.value)}
        value={searchSkill}
        className="w-full"
      />

      <CreateAssessmentForm />
    </Card>
  );
};

export default CreateAssessment;
