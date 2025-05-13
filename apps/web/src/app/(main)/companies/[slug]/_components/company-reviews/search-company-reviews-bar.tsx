'use client';

import { useRef } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useCompanyReviewsContext } from '@/context/company-reviews-context';
import { Input } from '@/components/shadcn-ui/input';
import Icon from '@/components/ui/icon';
import ReviewsOrderSelect from './reviews-order-select';

const SearchCompanyReviewsBar = () => {
  const { setQuery } = useCompanyReviewsContext();
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={searchBarRef}
      className="relative flex w-full flex-col items-center justify-center gap-2 sm:flex-row"
    >
      <div className="relative w-full">
        <Input
          placeholder="Search reviews..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <Icon
          icon={faMagnifyingGlass}
          className="text-primary-gray absolute right-3 top-3 w-3"
        />
      </div>
      <ReviewsOrderSelect />
    </div>
  );
};

export default SearchCompanyReviewsBar;
