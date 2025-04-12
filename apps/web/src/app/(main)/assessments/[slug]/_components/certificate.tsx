import Container from '@/components/layout/container';
import Image from 'next/image';

const Certificate = () => {
  return (
    <Container className="grid gap-6 py-8 lg:grid-cols-6 lg:py-16">
      <div className="flex flex-col justify-center gap-2 md:gap-4 lg:col-span-2">
        <h2 className="heading-1">Get your own certificate</h2>
        <p>
          You can show it off on your LinkedIn profile, resume/CV. Not to
          mention - it can also help you during your performance reviews
        </p>
      </div>
      <div className="flex w-full items-center justify-end lg:col-span-4">
        <div className="relative aspect-[22/17] w-full max-w-[700px] bg-gray-200">
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
