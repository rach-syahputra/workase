import Image from 'next/image';
import { Metadata } from 'next';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import { Card } from '@/components/shadcn-ui/card';
import DevLoginForm from './_components/dev-login-form';

export const metadata: Metadata = {
  title: 'Sign In — Developer',
  description:
    'Manage assessments, skills and transactions with powerful developer tools in Workase.',
  openGraph: {
    title: 'Sign In — Developer',
    description:
      'Manage assessments, skills and transactions with powerful developer tools in Workase.',
    url: CLIENT_BASE_URL,
    type: 'website',
    siteName: 'Workase Job Board',
    images: [
      {
        url: '/workase-sm-bg-black.png',
        secureUrl: '/workase-sm-bg-black.png',
        width: 1200,
        height: 630,
        alt: 'Workase Job Board',
      },
    ],
  },
  metadataBase: new URL(CLIENT_BASE_URL),
};

const DevLoginPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-[400px] items-center justify-center py-10">
      <nav className="fixed left-0 top-0 flex w-full items-center justify-start p-4">
        <Image
          src="/workase-for-developer.png"
          alt="Workae"
          width={200}
          height={100}
          className="aspect-auto w-[100px] object-cover"
        />
      </nav>
      <Card className="p-4 max-md:border-none max-md:shadow-none md:p-8">
        <DevLoginForm />
      </Card>
    </div>
  );
};

export default DevLoginPage;
