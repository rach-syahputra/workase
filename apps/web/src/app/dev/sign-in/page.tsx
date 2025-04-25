import Image from 'next/image';

import { Card } from '@/components/shadcn-ui/card';
import DevLoginForm from './_components/dev-login-form';

const DevLoginPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-[400px] items-center justify-center py-10">
      <nav className="fixed left-0 top-0 flex w-full items-center justify-start p-4">
        <Image
          src="/workase.png"
          alt="Workae"
          width={200}
          height={100}
          className="aspect-auto w-[100px] object-cover"
        />
      </nav>
      <Card className="p-8">
        <DevLoginForm />
      </Card>
    </div>
  );
};

export default DevLoginPage;
