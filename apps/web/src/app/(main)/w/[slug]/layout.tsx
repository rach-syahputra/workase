import React from 'react';
import { Metadata } from 'next';

import { UserDetailProvider } from '@/context/user-detail-context';
import Container from '@/components/layout/container';
import ProfileMenu from './_components/profile-menu';

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export const generateMetadata = async ({
  params,
}: ProfilePageProps): Promise<Metadata> => {
  const slug = (await params).slug;

  return {
    title: `${slug} — Workase`,
    description:
      'Find your dream job with Workase—a powerful job board connecting top talent with leading companies. Browse job listings, apply with ease, and take the next step in your career.',
  };
};

const ProfileLayout = async ({ params, children }: ProfilePageProps) => {
  const slug = (await params).slug;

  return (
    <UserDetailProvider slug={slug}>
      <Container className="flex min-h-[calc(100svh-70px)] w-full flex-col items-start gap-6 p-0 lg:grid lg:grid-cols-7 lg:px-8">
        <ProfileMenu className="col-span-2 w-full max-lg:hidden" />
        <div className="w-full pb-8 lg:col-span-5 lg:mt-4">{children}</div>
      </Container>
    </UserDetailProvider>
  );
};

export default ProfileLayout;
