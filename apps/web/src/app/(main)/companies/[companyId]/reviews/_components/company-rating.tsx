'use client';

import { useEffect, useState } from 'react';

import { getCompanyRating } from '@/lib/apis/company-reviews';
import { ICompanyRating } from '@/lib/interfaces/company-review';
import CompanyRatingCard from '@/components/company/reviews/company-rating-card';
import CompanyRatingLoading from './company-rating-loading';

interface CompanyRatingProps {
  companyId: string;
}

const CompanyRating = ({ companyId }: CompanyRatingProps) => {
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

  const fetchCompanyRating = async () => {
    setIsLoading(true);

    const response = await getCompanyRating(companyId);

    if (response.success) {
      setRating(response.data?.rating!);
      setTotalReviews(response.data?.totalReviews || 0);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanyRating();
  }, [companyId]);

  return (
    <>
      {isLoading ? (
        <CompanyRatingLoading />
      ) : (
        <CompanyRatingCard rating={rating!} totalReviews={totalReviews} />
      )}
    </>
  );
};

export default CompanyRating;
