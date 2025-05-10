import React from 'react';
import { Metadata } from 'next';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import { getUserMetadata } from '@/lib/apis/user-stats';
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
  const response = await getUserMetadata({ slug });
  const profilePhoto = response.data?.user.profilePhoto;
  const summary = response.data?.user.summary;

  return {
    title: `${slug} — Workase`,
    description: summary
      ? summary
      : `Explore ${slug}'s profile on Workase to learn more about their skills, certifications and CV.`,
    openGraph: {
      title: `${slug} — Workase`,
      description: summary
        ? summary
        : `Explore ${slug}'s profile on Workase to learn more about their skills, certifications and CV.`,
      url: CLIENT_BASE_URL,
      type: 'website',
      siteName: 'Workase Job Board',
      images: [
        {
          url: profilePhoto ? profilePhoto : '/workase-sm-bg-black.png',
          secureUrl: profilePhoto ? profilePhoto : '/workase-sm-bg-black.png',
          width: 1200,
          height: 630,
          alt: `Image for ${slug} — Workase Profile`,
        },
      ],
    },
    metadataBase: new URL(CLIENT_BASE_URL),
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
