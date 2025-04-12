import Footer from '@/components/footer/page';
import NavigationBar from '@/components/navigation-bar/page';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
