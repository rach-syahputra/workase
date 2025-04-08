import Image from 'next/image';

import { cn } from '@/lib/utils';

interface AppLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const AppLogo = ({ width, height, className }: AppLogoProps) => {
  return (
    <Image
      src="/workase.png"
      alt="Workase"
      width={width || 921}
      height={height || 189}
      className={cn('w-[120px]', className)}
    />
  );
};

export default AppLogo;
