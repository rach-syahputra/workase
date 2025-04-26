import { PageType } from '@/types/profile-page';
import { MenuIcon } from 'lucide-react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { set } from 'cypress/types/lodash';
import { cn } from '@/lib/utils';
interface SidebarProps {
  activePage: PageType;
  onPageChange: (page: PageType) => void;
}
export function SidebarPage({ activePage, onPageChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const chechkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    chechkIfMobile();
    window.addEventListener('resize', chechkIfMobile);
    return () => {
      window.removeEventListener('resize', chechkIfMobile);
    };
  }, []);
  const sidebarItems: { id: PageType; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'user-circle' },
    { id: 'password', label: 'Password', icon: 'lock-closed' },
    { id: 'verification', label: 'Verification', icon: 'check-circle' },
  ];
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'user-circle':
        return (
          <svg
            className="h-5 w-5"
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
        );

      case 'lock-closed':
        return (
          <svg
            className="h-5 w-5"
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
        );
      case 'check-circle':
        return (
          <svg
            className="h-5 w-5"
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
        );
      default:
        return null;
    }
  };
  const toogleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Toogle sidebar */}
      <button
        className="fixed left-3 top-[60px] z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md md:hidden"
        onClick={toogleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {/* Overlay untuk mobile saat sidebar terbuka */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar container yang responsive */}
      <div
        className={cn(
          'z-30 h-full border-r bg-white transition-all duration-300',
          isOpen ? 'w-64' : 'w-0 md:w-16',
          isMobile && !isOpen && 'hidden',
          'fixed md:relative',
        )}
      >
        {/* SIdebar content */}
        <div className="px-4 py-8">
          <nav>
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`flex w-full items-center rounded-md px-4 py-2 ${
                      activePage === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{getIcon(item.icon)}</span>
                    <span className={cn(!isOpen && 'md:hidden')}>
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SidebarPage;
