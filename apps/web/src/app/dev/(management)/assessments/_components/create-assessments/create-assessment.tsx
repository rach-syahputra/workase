'use client';

import { useCreateAssessmentContext } from '@/context/create-assessment-context';
import { Card } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import AvailableSkills from './available-skills';

const CreateAssessment = () => {
  const { searchSkill, setSearchSkill } = useCreateAssessmentContext();

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="heading-4 font-semibold">Create Assessment</h2>
      <Input
        type="text"
        placeholder="Search available skills..."
        onChange={(e) => setSearchSkill(e.target.value)}
        value={searchSkill}
        className="w-full"
      />

      <AvailableSkills className="mt-3" />
    </Card>
  );
};

export default CreateAssessment;
