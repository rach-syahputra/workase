import { cn } from '@/lib/utils';
import { ISearchCompanyReview } from '@/lib/interfaces/company-review';
import { Card } from '@/components/shadcn-ui/card';
import SearchCompanyReviews from './search-company-reviews';
import SearchCompanyReviewsLoading from './search-company-reviews-loading';

interface SearchCompanyReviewsDropdownProps {
  companies: ISearchCompanyReview[];
  isLoading: boolean;
  open: boolean;
  className?: string;
}

const SearchCompanyReviewsDropdown = ({
  companies,
  isLoading,
  open,
  className,
}: SearchCompanyReviewsDropdownProps) => {
  return open ? (
    <Card className={cn('absolute z-50 mt-0.5 w-full pt-3', className)}>
      {isLoading ? (
        <SearchCompanyReviewsLoading />
      ) : companies.length > 0 ? (
        <SearchCompanyReviews companies={companies} />
      ) : (
        <p className="text-primary-gray px-4 pb-3 text-sm">
          No companies found.
        </p>
      )}
    </Card>
  ) : null;
};

export default SearchCompanyReviewsDropdown;
