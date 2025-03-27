'use client';
import { useState } from 'react';

const tabs = ['Sign in', 'Employers/Post Job'];

export default function Login() {
  const [activeTab, setActiveTab] = useState('Sign in'); // Tab aktif awalnya

  return (
    <div className="mt-[5px] hidden items-center md:flex">
      {tabs.map((tab, index) => (
        <div key={tab} className="relative flex items-center">
          {/* Tombol Tab */}
          <button
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 text-[15px] font-medium transition-all ${tab === 'Sign in' ? 'text-primary-dark-blue font-semibold' : 'text-gray-600'} `}
          >
            {tab}
          </button>

          {/* Border Vertikal (Hanya untuk tab pertama) */}
          {index === 0 && <span className="h-7 w-[1px] bg-gray-300"></span>}
        </div>
      ))}
    </div>
  );
}
