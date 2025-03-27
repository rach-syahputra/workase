import NavigationBar from '@/components/navigation-bar/page';
import { SampleProvider } from '@/context/sample-context';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <main>
        <SampleProvider>{children}</SampleProvider>
      </main>
    </>
  );
}
