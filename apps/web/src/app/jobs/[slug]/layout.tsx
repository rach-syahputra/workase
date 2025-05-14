import Footer from '@/components/layout/footer';
import NavigationBar from '@/components/layout/navigation-bar/navigation-bar';
import { Toaster } from '@/components/shadcn-ui/toaster';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow">
        {children} <Toaster />
      </main>
      <Footer />
    </div>
  );
}
