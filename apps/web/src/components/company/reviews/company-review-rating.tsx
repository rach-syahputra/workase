import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/shadcn-ui/hover-card';
import Rating from '@/components/ui/rating';

interface CompanyReviewRatingProps {
  rating: {
    overall: number;
    workCulture: number;
    workLifeBalance: number;
    facilities: number;
    careerGrowth: number;
  };
}

const CompanyReviewRating = ({ rating }: CompanyReviewRatingProps) => {
  return (
    <HoverCard openDelay={300} closeDelay={300}>
      <HoverCardTrigger className="w-fit">
        <Rating value={rating.overall} className="py-1" />
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="left-0 flex w-fit flex-col gap-2"
      >
        <Rating
          label="Work Culture"
          value={rating.workCulture}
          className="w-full justify-between"
        />
        <Rating
          label="Work-life Balance"
          value={rating.workLifeBalance}
          className="w-full justify-between"
        />
        <Rating
          label="Facilities"
          value={rating.facilities}
          className="w-full justify-between"
        />
        <Rating
          label="Career Growth"
          value={rating.careerGrowth}
          className="w-full justify-between"
        />
      </HoverCardContent>
    </HoverCard>
  );
};

export default CompanyReviewRating;
