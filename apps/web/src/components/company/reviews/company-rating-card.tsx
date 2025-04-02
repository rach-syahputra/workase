import { starLabel } from '@/lib/constants/company-reviews';
import { ICompanyRating } from '@/lib/interfaces/company-review';
import { Card } from '@/components/shadcn-ui/card';
import { Progress } from '@/components/shadcn-ui/progress';
import { Separator } from '@/components/shadcn-ui/separator';
import Rating from '@/components/ui/rating';

interface CompanyRatingCardProps {
  rating: ICompanyRating;
  totalReviews: number;
}

const CompanyRatingCard = ({
  rating,
  totalReviews,
}: CompanyRatingCardProps) => {
  return (
    <Card className="flex w-full flex-col justify-between p-4 md:flex-row md:items-center">
      <div className="flex w-full items-center justify-between gap-4 border-gray-200 md:border-r md:pr-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-4xl font-bold">{rating.overall}</span>
          <Rating value={rating.overall} size="lg" />
          <span className="text-primary-gray text-xs">
            {totalReviews} reviews
          </span>
        </div>
        <div className="flex w-full flex-col gap-1">
          {Object.entries(rating.percentage.star).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs">{starLabel[key]} star</span>
                <span className="text-xs">{value}%</span>
              </div>
              <Progress value={value} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-4 bg-gray-200 md:hidden" />
      <div className="flex h-full w-full flex-col gap-2 md:pl-4">
        <Rating
          label="Work Culture"
          value={rating.workCulture}
          size="md"
          showValue
          className="w-full justify-between"
        />
        <Rating
          label="Work-life Balance"
          value={rating.workLifeBalance}
          size="md"
          showValue
          className="w-full justify-between"
        />
        <Rating
          label="Facilities"
          value={rating.facilities}
          size="md"
          showValue
          className="w-full justify-between"
        />
        <Rating
          label="Career Growth"
          value={rating.careerGrowth}
          size="md"
          showValue
          className="w-full justify-between"
        />
      </div>
    </Card>
  );
};

export default CompanyRatingCard;
