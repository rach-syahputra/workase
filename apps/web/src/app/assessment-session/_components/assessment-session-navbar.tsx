'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn, formatAssessmentDate } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import AssessmentSessionProgress from './assessment-session-progress';
import AssessmentSessionSubmitButton from './assessment-session-submit-button';
import AssessmentSessionDrawer from './assessment-session-drawer';

interface AssessmentSessionNavbarItemProps {
  title: string;
  value: string;
  className?: string;
}

const AssessmentSessionNavbar = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { userAssessment } = useAssessmentSessionContext();
  const { onTopOfScreen, setOnTopOfScreen } = useAssessmentSessionContext();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        const currentScrollY = window.scrollY;

        if (currentScrollY > navbarHeight + 16) {
          setOnTopOfScreen(false);
        }

        if (currentScrollY <= navbarHeight + 16) {
          setOnTopOfScreen(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, setOnTopOfScreen]);

  return (
    <nav
      ref={navbarRef}
      className={cn(
        'h-assessment-session-navbar-height border-border fixed top-0 z-50 grid w-full grid-cols-[1fr_100px] items-center border-b bg-white px-6 transition-all duration-300 ease-in-out sm:grid-cols-[1fr_150px] lg:grid-cols-[120px_1fr_150px] xl:grid-cols-[200px_1fr_150px]',
        {
          '-top-[60px]': !onTopOfScreen,
        },
      )}
    >
      <Image
        src="/workase.png"
        alt="Logo"
        width={500}
        height={102.61}
        className="hidden w-[100px] lg:block"
      />
      <div className="border-border flex h-full items-center justify-between gap-4 border-r pr-4 lg:border-l lg:px-4">
        <AssessmentSessionDrawer />
        <AssessmentSessionNavbarItem
          title="Assessment Title:"
          value={userAssessment?.assessment.skillTitle || ''}
          className="max-lg:hidden"
        />
        <AssessmentSessionNavbarItem
          title="Assessment Date:"
          value={formatAssessmentDate(
            new Date(userAssessment?.assessment.date || ''),
          )}
          className="max-lg:hidden"
        />
        <AssessmentSessionProgress />
      </div>

      <div className="flex h-full w-full items-center justify-center pl-4">
        <AssessmentSessionSubmitButton />
      </div>
    </nav>
  );
};

const AssessmentSessionNavbarItem = ({
  title,
  value,
  className,
}: AssessmentSessionNavbarItemProps) => {
  return (
    <div className={cn('flex items-center justify-start gap-2', className)}>
      <span className="text-primary-gray line-clamp-1 text-xs md:text-sm">
        {title}
      </span>
      <span className="line-clamp-1 text-sm font-bold">{value}</span>
    </div>
  );
};

export default AssessmentSessionNavbar;
