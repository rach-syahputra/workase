'use client';

import { useEffect } from 'react';

import { useBrowseSkillsContext } from '@/context/browse-skills-context';
import { Card } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import Skills from './skills';
import CreateSkillModal from './create-skill-modal';

const BrowseSkills = () => {
  const { searchSkill, setSearchSkill, fetchSkills } = useBrowseSkillsContext();

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <Card className="flex w-full flex-col items-start justify-between gap-2 max-md:border-none max-md:shadow-none md:p-5">
      <h2 className="heading-4 font-semibold">Browse Skills</h2>
      <Input
        type="text"
        placeholder="Search skills..."
        onChange={(e) => setSearchSkill(e.target.value)}
        value={searchSkill}
        className="w-full"
      />
      <Card className="mt-4 flex h-full w-full flex-1 flex-col items-start justify-between gap-4 max-md:border-none max-md:shadow-none md:p-5">
        <Skills />
        <CreateSkillModal />
      </Card>
    </Card>
  );
};

export default BrowseSkills;
