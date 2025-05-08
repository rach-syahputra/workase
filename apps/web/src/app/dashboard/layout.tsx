import { redirect } from 'next/navigation';
import { Metadata } from 'next';

import { auth } from '@/auth';
import NavigationBar from '@/components/layout/navigation-bar/navigation-bar';
import UserSidebar from '@/components/user-dashboard/user-sidebar';

export const metadata: Metadata = {
  title: 'Dashboard — Workase',
  description:
    'Find your dream job with Workase—a powerful job board connecting top talent with leading companies. Browse job listings, apply with ease, and take the next step in your career.',
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
