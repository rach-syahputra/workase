import { cn, formatSubscriptionStat } from '@/lib/utils';
import { SUBSCRIPTION_STATS } from '@/lib/constants/subscription';
import Container from '@/components/layout/container';

const SubscriptionStats = () => {
  return (
    <Container className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
      {SUBSCRIPTION_STATS.map((stat, index) => (
        <div
          key={index}
          className="hover:border-border col-span-1 flex select-none flex-col items-center justify-center gap-1.5 border-white bg-white p-5 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow"
        >
          <span
            className={cn('text-4xl font-bold', {
              'text-primary-blue': index === SUBSCRIPTION_STATS.length - 1,
            })}
          >
            {formatSubscriptionStat(stat.amount)}
          </span>
          <p className="text-primary-gray text-sm">{stat.label}</p>
        </div>
      ))}
    </Container>
  );
};

export default SubscriptionStats;
