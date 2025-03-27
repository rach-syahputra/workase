'use client';
import { useState } from 'react';

const tabs = ['Home', 'Jobs', 'Companies'];

export default function Menu() {
  const [activeTab, setActiveTab] = useState('Jobs');

  return (
    <div className="mt-[6.5px] hidden space-x-6 md:flex">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`font-geist relative text-[15px] font-medium transition-all hover:text-blue-600 ${activeTab === tab ? 'text-blue-600' : 'text-gray-600'} `}
        >
          {tab}
          {/* Underline */}
          <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 transition-all ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}
          />
        </button>
      ))}
    </div>
  );
}
