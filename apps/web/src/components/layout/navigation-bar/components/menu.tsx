'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home', value: '/' },
  { label: 'Jobs', value: '/all-jobs' },
  { label: 'Companies', value: '/all-companies' },
  { label: 'Reviews', value: '/company-reviews' },
];
export default function Menu() {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState('Home');
  const pathname = usePathname();
  const router = useRouter();

  // Sync active tab saat URL berubah
  useEffect(() => {
    const matchedTab = tabs.find((tab) => pathname === tab.value);

    if (matchedTab) {
      setActiveTab(matchedTab.label);
    }
  }, [pathname]);

  const handleTabClick = (tab: (typeof tabs)[number]) => {
    router.push(tab.value);

    setActiveTab(tab.label);
  };
  return (
    <div className="mt-[6.5px] hidden space-x-6 md:flex">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
          onClick={() => handleTabClick(tab)}
          className={`font-geist hover:text-primary-blue relative text-[15px] font-medium transition-all ${activeTab === tab.label ? 'text-primary-blue' : 'text-gray-600'} `}
        >
          {tab.label}
          {/* Underline */}
          <span
            className={`bg-primary-blue absolute bottom-0 left-0 h-[2px] w-full transition-all ${activeTab === tab.label ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}
          />
        </button>
      ))}
    </div>
  );
}
