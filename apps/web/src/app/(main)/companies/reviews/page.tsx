import { CompaniesReviewsProvider } from '@/context/companies-reviews-context';
import Container from '@/components/layout/container';
import SearchCompanyReviewsBar from './_components/search-company-reviews-bar';
import CreateCompanyReviewModal from './_components/create-company-review-modal';
import CompaniesReviews from './_components/companies-reviews';

const CompanyReviewsPage = () => {
  return (
    <Container>
<<<<<<< HEAD
      <section className="mx-auto max-w-screen-md">
        <div className="flex items-center justify-center gap-2">
          <SearchInput />
          <CreateCompanyReviewModal />
        </div>
=======
      <section className="mx-auto flex max-w-screen-md flex-col gap-4">
        <CompaniesReviewsProvider>
          <div className="flex items-center justify-center gap-2">
            <SearchCompanyReviewsBar />
            <CreateCompanyReviewModal />
          </div>
          <CompaniesReviews />
        </CompaniesReviewsProvider>
>>>>>>> 891b532 (feat(web): add companies reviews context)
      </section>
    </Container>
  );
};

export default CompanyReviewsPage;
