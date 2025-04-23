import Container from '@/components/layout/container';
import Footer from '@/components/ui/footer-for-auth';
import Logo from '@/components/ui/logo-for-auth';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#f8f5f0] to-[#e4e0da]">
      <Logo />
      <main className="flex-grow">
        <Container className="px-7 pt-[0px] md:flex md:items-center md:justify-center">
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
