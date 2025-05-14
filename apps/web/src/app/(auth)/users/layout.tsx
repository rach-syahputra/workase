import Container from '@/components/layout/container';
import Footer from '@/components/ui/footer-for-auth';
import Logo from '@/components/ui/logo-for-auth';
import { Toaster } from '@/components/shadcn-ui/toaster';
import Link from 'next/link';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#f6f9fc] to-[#e6f0ff]">
      <Link href="/">
        <Logo />
      </Link>
      <main className="flex-grow">
        <Container className="px-7 pt-[0px] md:flex md:items-center md:justify-center">
          {children}
          <Toaster />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
