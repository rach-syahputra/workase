import { CompaniesReviewsProvider } from '@/context/companies-reviews-context';
import Container from '@/components/layout/container';
import SearchCompanyReviewsBar from './_components/search-company-reviews-bar';
import CreateCompanyReviewModal from './_components/create-company-review-modal';
import CompaniesReviews from './_components/companies-reviews';

const CompanyReviewsPage = () => {
  return (
    <Container>
      <section className="mx-auto max-w-screen-md">
        <div className="flex items-center justify-center gap-2">
          <SearchInput />
          <CreateCompanyReviewModal />
        </div>
      </section>
    </Container>
  );
};

export default CompanyReviewsPage;
