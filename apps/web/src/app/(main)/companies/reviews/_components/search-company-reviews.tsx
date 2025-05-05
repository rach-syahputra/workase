import Link from 'next/link';
import Image from 'next/image';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { ISearchCompanyReview } from '@/lib/interfaces/company-review';
import Icon from '@/components/ui/icon';

interface SearchCompanyReviewsProps {
  companies: ISearchCompanyReview[];
  className?: string;
}

const SearchCompanyReviews = ({
  companies,
  className,
}: SearchCompanyReviewsProps) => {
  return (
    <>
      <h2 className="heading-5 px-4">Companies</h2>
      <ul className={cn('mt-1 flex w-full flex-col items-start', className)}>
        {companies?.length > 0 &&
          companies?.map((company, index) => (
            <li
              key={index}
              className="w-full cursor-pointer px-4 py-2 transition-all duration-300 ease-in-out hover:bg-gray-200"
            >
              <Link
                href={`/companies/${company.slug}/reviews`}
                aria-label={`${company.name} reviews`}
                className="flex w-full items-center gap-3"
              >
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={100}
                    height={100}
                    className="aspect-square w-9 rounded-md"
                  />
                ) : (
                  <div className="aspect-square w-9 rounded-md bg-gray-200"></div>
                )}

                <div className="flex flex-col">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-sm font-medium">{company.name}</h3>
                    <div className="flex items-center justify-center gap-1">
                      <Icon icon={faStar} className="w-3 text-yellow-400" />
                      <span className="text-xs">{company.overallRating}</span>
                    </div>
                  </div>
                  <span className="text-primary-gray text-xs">
                    {company.totalReviews} reviews
                  </span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SearchCompanyReviews;
