'use client';

import { useCallback, useEffect, useState } from 'react';

import { getCompanyRating } from '@/lib/apis/company-reviews';
import { ICompanyRating } from '@/lib/interfaces/company-review';
import { useCompanyReviewsContext } from '@/context/company-reviews-context';
import CompanyRatingCard from '@/components/company/reviews/company-rating-card';
import CompanyRatingLoading from './company-rating-loading';

const CompanyRating = () => {
  const { slug } = useCompanyReviewsContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<ICompanyRating>({
    overall: 0,
    workCulture: 0,
    workLifeBalance: 0,
    facilities: 0,
    careerGrowth: 0,
    percentage: {
      star: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      category: {
        workCulture: 0,
        workLifeBalance: 0,
        facilities: 0,
        careerGrowth: 0,
      },
    },
  });
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const fetchCompanyRating = useCallback(async () => {
    setIsLoading(true);

    const response = await getCompanyRating(slug);

    if (response.success) {
      setRating(response.data?.rating!);
      setTotalReviews(response.data?.totalReviews || 0);
    }

    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchCompanyRating();
  }, [fetchCompanyRating]);

  return (
    <div className="w-full max-md:px-4">
      {isLoading ? (
        <CompanyRatingLoading />
      ) : (
        <CompanyRatingCard rating={rating!} totalReviews={totalReviews} />
      )}
    </div>
  );
};

export default CompanyRating;
