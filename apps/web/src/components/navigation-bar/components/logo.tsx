import Image from 'next/image';
import * as React from 'react';

export default function Logo() {
  return (
    <div>
      <div className="flex h-[52px] w-[145px] items-center justify-center border-gray-200 md:h-[68px] md:w-[150px] lg:w-[176px]">
        <Image
          src="/workase.png"
          alt="Logo"
          width={600}
          height={122.61}
          className="w-[106px] md:w-[130px]"
        />
      </div>
    </div>
  );
}
