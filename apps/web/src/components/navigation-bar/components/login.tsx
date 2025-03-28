'use client';
import { useState } from 'react';

const tabs = ['Sign in', 'Employers/Post Job'];

export default function Login() {
  return (
    <div className="mt-[5px] hidden items-center md:flex">
      {tabs.map((tab) => (
        <div key={tab} className="relative flex items-center">
          {/* Tombol Tab */}
          <button
            ref={undefined}
            className={`relative h-[68px] w-full px-5 text-[15px] font-medium transition-all ${tab === 'Sign in' ? 'text-primary-dark-blue font-semibold' : 'text-gray-600'} `}
          >
            {tab}
          </button>

          {/* Border Vertikal (Hanya untuk tab pertama) */}
          {tab === 'Sign in' && (
            <span className="h-7 w-[1px] bg-gray-300"></span>
          )}
        </div>
      ))}
    </div>
  );
}
