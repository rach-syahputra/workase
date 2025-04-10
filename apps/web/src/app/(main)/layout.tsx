import Footer from '@/components/footer/page';
import NavigationBar from '@/components/navigation-bar/page';
import { SampleProvider } from '@/context/sample-context';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-grow">
        <SampleProvider>{children}</SampleProvider>
      </main>
      <Footer />
    </div>
  );
}
