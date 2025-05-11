'use client';

import { useSearchParams } from 'next/navigation';

import { useUserDetailContext } from '@/context/user-detail-context';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import AppLoading from '@/components/ui/app-loading';
import Profile from './profile';
import SkillBadges from './skill-badges';
import Cv from './cv';
import Company from './company';

const PageContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const { isLoading } = useUserDetailContext();

  return (
    <Card className="flex flex-col max-lg:border-none max-lg:shadow-none">
      {isLoading ? (
        <div className="flex w-full items-center justify-center p-8">
          <AppLoading />
        </div>
      ) : tab === 'company' ? (
        <Company />
      ) : (
        <>
          <Profile />
          <Separator />
          <SkillBadges />
          <Separator />
          <Cv />
        </>
      )}
    </Card>
  );
};

export default PageContent;
