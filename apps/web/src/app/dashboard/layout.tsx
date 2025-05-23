import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { auth } from '@/auth';
import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import NavigationBar from '@/components/layout/navigation-bar/navigation-bar';
import UserSidebar from '@/components/user-dashboard/user-sidebar';
import UserDashboardBottomBar from '@/components/user-dashboard/user-dashboard-bottom-bar';
import { Toaster } from '@/components/shadcn-ui/toaster';

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
        width: 630,
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
  if (session?.user?.role !== 'USER') {
    redirect('/');
  }

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <NavigationBar />
      <div className="relative flex flex-col items-start justify-start w-full bg-white min-w-screen lg:flex-row">
        <UserSidebar />
        <div className="flex flex-col flex-1 w-full bg-white max-lg:pb-8 lg:ml-sidebar lg:p-4 lg:pl-0">
          <main className="flex-1 w-full rounded-md">
            {children}
            <Toaster />
          </main>
        </div>
      </div>
      <UserDashboardBottomBar />
    </div>
  );
}
