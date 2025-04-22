import Container from '@/components/layout/container';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main className="">
        <Container className="flex px-7 pt-[0px]">{children}</Container>
      </main>
    </div>
  );
}
