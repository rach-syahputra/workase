'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const tabs = [
  { label: 'Home', value: 'dashboard' },
  { label: 'Jobs', value: 'all-jobs' },
  { label: 'Companies', value: 'companies' },
];
export default function Menu() {
  const searchParams = useSearchParams();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState('Home');
  const pathname = usePathname();
  const router = useRouter();

  // Sync active tab saat URL berubah
  useEffect(() => {
    const current = pathname.split('/')[1];
    const matchedTab = tabs.find((tab) => tab.value === current);
    if (matchedTab) {
      setActiveTab(matchedTab.label);
    }
  }, [pathname]);

  // useEffect(() => {
  //   const index = tabs.findIndex((tab) => tab.label === activeTab);
  //   if (tabRefs.current[index]) {
  //     tabRefs.current[index];
  //   }
  //   const path = '/' + tabs[index].value;
  //   const queryString = searchParams.toString();
  //   router.push(`${path}${queryString ? '?' + queryString : ''}`);
  // }, [activeTab]);

  const handleTabClick = (tab: (typeof tabs)[number]) => {
    const queryString = searchParams.toString();
    const path = `/${tab.value}${queryString ? '?' + queryString : ''}`;
    router.push(path);
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
