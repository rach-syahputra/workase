'use client';

import { useRouter } from 'next/navigation';
import Countdown from 'react-countdown';

interface PaymentCountdownProps {
  startTime: Date;
}

const PaymentCountdown = ({ startTime }: PaymentCountdownProps) => {
  const router = useRouter();

  const handleExpiredTime = () => {
    router.push('/dashboard/subscription');
  };

  return (
    startTime && (
      <Countdown
        date={startTime.getTime() + 24 * 60 * 60 * 1000} // 24 hours countdown
        onComplete={handleExpiredTime}
        renderer={({ hours, minutes, seconds }) => (
          <span className="text-lg font-bold md:text-base">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </span>
        )}
      />
    )
  );
};

export default PaymentCountdown;
