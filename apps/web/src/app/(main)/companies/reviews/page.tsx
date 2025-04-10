import { CompaniesReviewsProvider } from '@/context/companies-reviews-context';
import Container from '@/components/layout/container';
import SearchCompanyReviewsBar from './_components/search-company-reviews-bar';
import CreateCompanyReviewModal from './_components/create-company-review-modal';
import CompaniesReviews from './_components/companies-reviews';

const CompanyReviewsPage = () => {
  return (
    <Container>
      <section className="mx-auto flex max-w-screen-md flex-col gap-4">
        <CompaniesReviewsProvider>
          <div className="flex items-center justify-center gap-2">
            <SearchCompanyReviewsBar />
            <CreateCompanyReviewModal />
          </div>
          <CompaniesReviews />
        </CompaniesReviewsProvider>
      </section>
    </Container>
  );
};

export default CompanyReviewsPage;
