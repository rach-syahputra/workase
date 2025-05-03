'use client';
import Container from '@/components/layout/container';
import { PageType } from '@/types/profile-page';
import { usePathname, useRouter } from 'next/navigation';
import SidebarPage from './_components/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getActivePage = (): PageType => {
    if (pathname.includes('/profile-management/password')) return 'password';
    if (pathname.includes('/profile-management/email')) return 'email';
    if (pathname.includes('/profile-management/verification'))
      return 'verification';
    return 'profile';
  };

  const handlePageChange = (page: PageType) => {
    router.push(`/profile-management/${page === 'profile' ? '' : page}`);
  };
  return (
    <div className="flex min-h-[calc(100vh-44px-108px)] min-w-[calc(100vw)] bg-gray-50 md:min-h-[calc(100vh-68px-152.5px)]">
      {/* <AppSidebar /> */}
      <aside className="">
        <SidebarPage
          activePage={getActivePage()}
          onPageChange={handlePageChange}
        />
      </aside>
      <main className="w-full">
        <Container className="flex px-7 pt-[0px]">{children}</Container>
      </main>
    </div>
  );
}
