'use client';
import Container from '@/components/layout/container';
import { PageType } from '@/types/profile-page';
import { usePathname, useRouter } from 'next/navigation';
import SidebarPage from './_components/sidebar';
import BottomNavigation from '@/components/layout/bottom-navigation';
import NavigationBar from '@/components/layout/navigation-bar/navigation-bar';

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

  const bottomNavItems = [
    {
      id: 1,
      label: 'Profile',
      icon: (
        <svg
          className={`h-full w-full ${pathname === '/profile-management' ? 'text-blue-600' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
      ),
      href: '/profile-management/',
    },
    {
      id: 2,
      label: 'Password',
      icon: (
        <svg
          className={`h-full w-full ${pathname.includes('/profile-management/password') ? 'text-blue-600' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      ),
      href: '/profile-management/password',
    },
    {
      id: 3,
      label: 'Verification',
      icon: (
        <svg
          className={`h-full w-full ${pathname.includes('/profile-management/verification') ? 'text-blue-600' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      href: '/profile-management/verification',
    },
  ];
  const handlePageChange = (page: PageType) => {
    router.push(`/profile-management/${page === 'profile' ? '' : page}`);
  };
  return (
    <div className="flex-col h-screen">
      <NavigationBar />
      <div className="flex min-h-[calc(100vh-0px-0px)] min-w-[calc(100vw)] bg-gray-50 md:min-h-[calc(100vh-0px-0px)]">
        <aside className="">
          <SidebarPage
            activePage={getActivePage()}
            onPageChange={handlePageChange}
          />
        </aside>
        <BottomNavigation items={bottomNavItems} />
        <main className="w-full">
          <Container className="flex px-7 pt-[0px]">{children}</Container>
        </main>
      </div>
    </div>
  );
}
