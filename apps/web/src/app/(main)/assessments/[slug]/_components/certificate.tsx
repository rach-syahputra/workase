import Image from 'next/image';

import Container from '@/components/layout/container';

const Certificate = () => {
  return (
    <Container className="flex min-h-[calc(100svh-68px)] flex-col items-center justify-center gap-4 px-8 py-8 lg:grid lg:grid-cols-6 lg:gap-6 lg:py-16">
      <div className="flex flex-col justify-center gap-2 md:gap-4 lg:col-span-2">
        <h2 className="heading-1">Get your own certificate</h2>
        <p>
          You can show it off on your LinkedIn profile, resume/CV. Not to
          mention - it can also help you during your performance reviews
        </p>
      </div>
      <div className="flex w-full items-center justify-center lg:col-span-4 lg:justify-end">
        <div className="relative aspect-[22/17] w-full bg-gray-200 md:max-w-[660px]">
          <Image
            src="/certificate-template.png"
            alt="Certificate"
            width={1056}
            height={816}
            className="aspect-auto w-full object-cover"
          />
        </div>
      </div>
    </Container>
  );
};

export default Certificate;
