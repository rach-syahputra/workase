'use client';

import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { ISearchCompanyReview } from '@/lib/interfaces/company-review';
import { searchCompanyReviews } from '@/lib/apis/company-reviews';
import { Input } from '@/components/shadcn-ui/input';
import Icon from '@/components/ui/icon';
import SearchCompanyReviewsDropdown from './search-company-reviews-dropdown';

const SearchCompanyReviewsBar = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [companies, setCompanies] = useState<ISearchCompanyReview[]>([]);

  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const fetchSearchCompanyReviews = async () => {
    setIsLoading(true);

    const response = await searchCompanyReviews({
      q: debouncedQuery,
    });

    if (response.success) {
      setCompanies(response.data?.companies || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handleDebouncedQuery = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handleDebouncedQuery);
  }, [query]);

  useEffect(() => {
    fetchSearchCompanyReviews();
  }, [debouncedQuery]);

  useClickAway(searchBarRef, () => setOpenDropdown(false));

  return (
    <div ref={searchBarRef} className="relative w-full">
      <div className="relative w-full">
        <Input
          placeholder="Find company or job title"
          onFocus={() => setOpenDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Icon
          icon={faMagnifyingGlass}
          className="text-primary-gray absolute right-3 top-3 w-3"
        />
      </div>
      <SearchCompanyReviewsDropdown
        companies={companies}
        open={openDropdown}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchCompanyReviewsBar;
