'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ISubscriptionCard } from '@/lib/interfaces/subscription';
import { Card } from '@/components/shadcn-ui/card';

interface SubscriptionCardProps {
  subscription: ISubscriptionCard;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const SubscriptionCard = ({
  subscription,
  onClick,
  isActive,
  className,
}: SubscriptionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer flex-col items-start justify-between gap-2 p-3 transition-all duration-300 ease-in-out',
        {
          'border-primary-blue shadow-primary-blue': isActive,
        },
        className,
      )}
    >
      <h3 className="font-medium">{subscription.category}</h3>
      <div className="flex items-center justify-center gap-0.5">
        <span className="text-lg font-bold">${subscription.price}</span>
        <span className="text-primary-gray">/</span>
        <span className="text-primary-gray">month</span>
      </div>
      <ul className="flex flex-col items-start gap-1">
        {subscription.benefits.map((benefit, index) => (
          <li key={index} className="flex items-center justify-center gap-1">
            <Check size={15} className="text-green-500" />
            <p className="text-sm">{benefit}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SubscriptionCard;
