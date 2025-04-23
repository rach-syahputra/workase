import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

interface DeveloperLayoutProps {
  children: React.ReactNode;
}

const DeveloperLayout = async ({ children }: DeveloperLayoutProps) => {
  const session = await auth();

  if (session?.user?.role !== 'DEVELOPER') {
    redirect('/auth/dev/sign-in');
  }

  return <>{children}</>;
};

export default DeveloperLayout;
