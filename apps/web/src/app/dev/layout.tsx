import { DeveloperAssessmentProvider } from '@/context/developer-assessment-context';
import DeveloperSidebar from '@/components/developer/developer-sidebar';
import DeveloperNavbar from '@/components/developer/developer-navbar';

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start lg:flex-row">
      <DeveloperNavbar />
      <DeveloperSidebar />
      <main className="min-h-screen w-full">
        <DeveloperAssessmentProvider>{children}</DeveloperAssessmentProvider>
      </main>
    </div>
  );
}
