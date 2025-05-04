'use client';

import { NEXTAUTH_SECRET } from '@/lib/constants/constants';
import { useEffect } from 'react';

function PageContent() {
  useEffect(() => {
    console.log('env:', process.env.NEXTAUTH_SECRET);
    console.log('constant:', NEXTAUTH_SECRET);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4"></div>
  );
}

export default PageContent;
