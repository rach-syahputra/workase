import { CompanyReviewRating } from '@/interfaces/company-review.interface';

export const calculateRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;

  const total = ratings.reduce((sum, rating) => sum + rating, 0);
  return parseFloat((total / ratings.length).toFixed(1));
};

export const calculateRatingPercentages = (reviews: CompanyReviewRating[]) => {
  if (reviews.length === 0) {
    return {
      star: { one: 0.0, two: 0.0, three: 0.0, four: 0.0, five: 0.0 },
      category: {
        workCulture: 0.0,
        workLifeBalance: 0.0,
        facilities: 0.0,
        careerGrowth: 0.0,
      },
    };
  }

  const starCounts = { one: 0, two: 0, three: 0, four: 0, five: 0 };

  // Summing up scores for each rating type
  const totals = reviews.reduce(
    (acc, review) => {
      acc.workCulture += review.workCulture;
      acc.workLifeBalance += review.workLifeBalance;
      acc.facilities += review.facilities;
      acc.careerGrowth += review.careerGrowth;

      // Count star rating occurrences
      if (review.overallRating === 1) starCounts.one++;
      else if (review.overallRating === 2) starCounts.two++;
      else if (review.overallRating === 3) starCounts.three++;
      else if (review.overallRating === 4) starCounts.four++;
      else if (review.overallRating === 5) starCounts.five++;

      return acc;
    },
    { workCulture: 0, workLifeBalance: 0, facilities: 0, careerGrowth: 0 },
  );

  // Calculate total sum of all ratings
  const totalScore =
    totals.workCulture +
    totals.workLifeBalance +
    totals.facilities +
    totals.careerGrowth;
  const totalReviews = reviews.length;

  // Convert to percentages
  return {
    star: {
      one: Number(((starCounts.one / totalReviews) * 100).toFixed(1)),
      two: Number(((starCounts.two / totalReviews) * 100).toFixed(1)),
      three: Number(((starCounts.three / totalReviews) * 100).toFixed(1)),
      four: Number(((starCounts.four / totalReviews) * 100).toFixed(1)),
      five: Number(((starCounts.five / totalReviews) * 100).toFixed(1)),
    },
    category: {
      workCulture: Number(((totals.workCulture / totalScore) * 100).toFixed(1)),
      workLifeBalance: Number(
        ((totals.workLifeBalance / totalScore) * 100).toFixed(1),
      ),
      facilities: Number(((totals.facilities / totalScore) * 100).toFixed(1)),
      careerGrowth: Number(
        ((totals.careerGrowth / totalScore) * 100).toFixed(1),
      ),
    },
  };
};
