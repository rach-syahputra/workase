import Image from 'next/image';
import * as React from 'react';

export default function Logo() {
  return (
    <div>
      <div className="flex h-[100px] w-full items-center justify-center border-gray-200 md:mb-3 md:h-[125px]">
        <Image
          src="/workase.png"
          alt="Logo"
          width={600}
          height={122.61}
          className="w-[160px]"
        />
      </div>
    </div>
  );
}
