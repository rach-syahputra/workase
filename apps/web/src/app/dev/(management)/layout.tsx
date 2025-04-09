import { DeveloperAssessmentProvider } from '@/context/developer-assessment-context';
import DeveloperSidebar from '@/components/developer/developer-sidebar';
import DeveloperNavbar from '@/components/developer/developer-navbar';

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-primary-dark-background min-w-screen relative flex min-h-screen w-full flex-col items-start justify-start lg:flex-row">
      <DeveloperNavbar />
      <DeveloperSidebar />
      <div className="bg-primary-dark-background flex min-h-screen w-full flex-col lg:p-4">
        <main className="w-full flex-1 rounded-md bg-white">
          <DeveloperAssessmentProvider>{children}</DeveloperAssessmentProvider>
        </main>
      </div>
    </div>
  );
}
