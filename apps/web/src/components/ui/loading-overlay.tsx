import { Card } from '../shadcn-ui/card';
import AppLoading from './app-loading';

interface LoadingOverlayProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const LoadingOverlay = ({ size, label }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden">
      <Card className="z-[100] flex w-fit items-center justify-center p-6">
        <AppLoading size={size} label={label} />
      </Card>
      <div className="bg-primary-dark absolute inset-0 h-full w-full opacity-80"></div>
    </div>
  );
};

export default LoadingOverlay;
