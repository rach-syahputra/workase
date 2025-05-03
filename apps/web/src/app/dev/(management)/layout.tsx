import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { DeveloperAssessmentProvider } from '@/context/developer-assessment-context';
import DeveloperSidebar from '@/components/developer/developer-sidebar';
import DeveloperNavbar from '@/components/developer/developer-navbar';

export default async function DeveloperManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect dev route
  const session = await auth();
  if (session?.user?.role !== 'DEVELOPER') {
    redirect('/dev/sign-in');
  }

  return (
    <div className="bg-primary-dark-background min-w-screen relative flex min-h-screen w-full flex-col items-start justify-start lg:flex-row">
      <DeveloperNavbar />
      <DeveloperSidebar />
      <div className="bg-primary-dark-background lg:ml-sidebar flex min-h-screen w-full flex-col lg:p-4 lg:pl-0">
        <main className="w-full flex-1 bg-white lg:rounded-md">
          <DeveloperAssessmentProvider>{children}</DeveloperAssessmentProvider>
        </main>
      </div>
    </div>
  );
}
