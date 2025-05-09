import { cn } from '@/lib/utils';
import SubscribeModal from '../subscribe-modal';

interface SubscriptionHeroHeaderProps {
  className?: string;
}

const SubscriptionHeroHeader = ({ className }: SubscriptionHeroHeaderProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <h1 className="heading-1">
        Upgrade Your <span className="text-primary-dark-blue">Experience</span>
      </h1>
      <p>
        Join our premium tier to unlock{' '}
        <span className="text-primary-dark-blue">advanced features</span> and{' '}
        <span className="text-primary-dark-blue">exclusive resources.</span>
      </p>
      <SubscribeModal className="max-md:hidden" />
    </div>
  );
};

export default SubscriptionHeroHeader;
