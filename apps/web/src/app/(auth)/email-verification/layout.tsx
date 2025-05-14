import { Toaster } from '@/components/shadcn-ui/toaster';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {children}
      <Toaster />
    </div>
  );
}
