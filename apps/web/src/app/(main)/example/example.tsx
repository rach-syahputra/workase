import Image from 'next/image';

import FormExample from './_components/form-example';
import CardExample from './_components/card-example';
import { Button } from '@/components/shadcn-ui/button';
import Container from '@/components/layout/container';

const ExamplePage = () => {
  return (
    <Container className="flex max-w-screen-lg flex-col gap-8 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="heading-1">Workase</h1>
        <span className="heading-2 text-primary-blue">Workase</span>
        <span className="heading-3 text-primary-dark-blue">Workase</span>
        <span className="text-primary-gray text-sm">Job Board Web App</span>
        <Image
          src="/workase.png"
          alt="Logo"
          width={500}
          height={102.61}
          className="w-[120px]"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sed
          sequi laborum corporis quidem, modi minus quam minima nemo, nesciunt
          nostrum ipsum ratione. Molestias sequi itaque sed reprehenderit quod
          quibusdam.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="heading">Button Example</h1>
        <Button className="w-fit">Get Started</Button>
        <Button variant="dark" className="w-fit">
          Find Jobs
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="heading mt-2">Card Example</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <CardExample />
          <CardExample />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="heading mt-2">Form Example</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <FormExample />
        </div>
      </div>
    </Container>
  );
};

export default ExamplePage;
