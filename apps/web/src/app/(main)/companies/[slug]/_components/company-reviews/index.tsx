import Container from '@/components/layout/container';
import CompanyRating from './company-rating';
import CompanyReviewsList from './company-reviews-list';

const CompanyReviews = () => {
  return (
    <Container className="relative mx-auto flex w-full max-w-screen-md flex-col py-0 max-md:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <CompanyRating />
        <CompanyReviewsList />
      </div>
    </Container>
  );
};

export default CompanyReviews;
