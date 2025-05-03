import * as React from 'react';

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <div className="font-geist bottom-1 flex w-full items-center justify-center pb-6 text-[14px] md:bottom-0 md:left-0 md:right-0 md:top-[calc(100vh-64px)]">
      <div className="text-gray-500">
        {' '}
        &copy; 2025 Workase. All Rights Reserved.
      </div>
    </div>
  );
}
