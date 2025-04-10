'use client';
import { Search } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { FaLocationDot } from 'react-icons/fa6';
import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';

export function SearchBar() {
  const [activeTab, setActiveTab] = useState<string | undefined>('Job Title');
  const search = [
    'Job Title',
    'Company Category',
    'Company Location',
    'Find Jobs',
  ];
  return (
    <div className="border-primary-gray mt-[5px] w-full max-w-[835px] flex-col items-center justify-center rounded-md p-[5px] md:flex md:flex-row md:items-center md:justify-around md:border-[1px] md:shadow-[1px_1px_10px_3px_rgba(0,0,0,0.1)]">
      {search.map((item) => (
        <div
          key={item}
          className={`relative flex-col items-center text-center md:h-[44px] ${item === 'Job Title' ? 'border-primary-gray rounded-t-md border-[2px] md:pt-[2px]' : item === 'Company Location' ? 'border-primary-gray mb-1 rounded-b-md border-[2px]' : item === 'Company Category' ? 'border-primary-gray my-[-2px] border-[2px]' : ''} md:mb-0 md:flex md:flex-row md:border-none md:pt-0`}
        >
          <div className="flex h-[52px] items-center justify-center">
            {/* Tombol item */}
            {item === 'Job Title' ? (
              <Search
                size={20}
                className={`ml-5 w-[25px] md:ml-3 ${activeTab === 'Job Title' ? 'text-primary-blue' : ''}`}
              />
            ) : item === 'Company Category' ? (
              <Building2
                size={20}
                className={`ml-5 w-[25px] ${activeTab === 'Company Category' ? 'text-primary-blue' : ''}`}
              />
            ) : item === 'Company Location' ? (
              <FaLocationDot
                size={20}
                className={`ml-5 w-[25px] ${activeTab === 'Company Location' ? 'text-primary-blue' : ''}`}
              />
            ) : null}
            {item === 'Job Title' ||
            item === 'Company Category' ||
            item === 'Company Location' ? (
              <input
                type="text"
                ref={undefined}
                onClick={() => setActiveTab(item)}
                className={`relative h-full w-full px-5 text-[15px] font-medium focus:border-[0px] focus:outline-none md:max-w-[225px]`}
                placeholder={item}
              ></input>
            ) : (
              <Button
                ref={undefined}
                onClick={() => setActiveTab(item)}
                className={`bg-primary-blue relative h-[48px] w-full px-5 text-[15px] font-medium md:h-[40px] md:w-[110px]`}
              >
                {item}
              </Button>
            )}
          </div>

          {/* Border Vertikal (Hanya untuk item pertama kedua) */}
          {(item === 'Job Title' || item === 'Company Category') && (
            <span className="bg-gray-300 md:h-[25px] md:w-[2px] md:border-none"></span>
          )}
        </div>
      ))}
    </div>
  );
}
