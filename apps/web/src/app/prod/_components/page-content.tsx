'use client';

import { NEXTAUTH_SECRET } from '@/lib/constants/constants';

function PageContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span>{process.env.NEXTAUTH_SECRET}</span>
      <span>{NEXTAUTH_SECRET}</span>
    </div>
  );
}

export default PageContent;
