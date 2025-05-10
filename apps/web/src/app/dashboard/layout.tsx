import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { auth } from '@/auth';
import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import NavigationBar from '@/components/layout/navigation-bar/navigation-bar';
import UserSidebar from '@/components/user-dashboard/user-sidebar';

export const metadata: Metadata = {
  title: 'Dashboard — Workase',
  description:
    'Access your personalized dashboard on Workase to view applied jobs, explore assessments, and manage your subscription.',
  openGraph: {
    title: 'Dashboard — Workase',
    description:
      'Access your personalized dashboard on Workase to view applied jobs, explore assessments, and manage your subscription.',
    url: CLIENT_BASE_URL,
    type: 'website',
    siteName: 'Workase Job Board',
    images: [
      {
        url: '/workase-sm-bg-black.png',
        secureUrl: '/workase-sm-bg-black.png',
        width: 1200,
        height: 630,
        alt: 'Workase Job Board',
      },
    ],
  },
  metadataBase: new URL(CLIENT_BASE_URL),
};

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.role) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <NavigationBar />
      <div className="min-w-screen relative flex w-full flex-col items-start justify-start bg-white lg:flex-row">
        <UserSidebar />
        <div className="lg:ml-sidebar flex w-full flex-1 flex-col bg-white lg:p-4 lg:pl-0">
          <main className="w-full flex-1 rounded-md">{children}</main>
        </div>
      </div>
    </div>
  );
}
