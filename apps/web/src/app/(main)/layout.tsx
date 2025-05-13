import NavigationBar from '@/components/layout/navigation-bar/navigation-bar';
import Footer from '@/components/layout/footer';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
