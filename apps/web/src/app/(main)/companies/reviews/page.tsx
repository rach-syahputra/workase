import { getCurrentCompanies } from '@/lib/apis/user-stats';
import { CompaniesReviewsProvider } from '@/context/companies-reviews-context';
import Container from '@/components/layout/container';
import SearchCompanyReviewsBar from './_components/search-company-reviews-bar';
import CreateCompanyReviewModal from './_components/create-company-review-modal';
import CompaniesReviews from './_components/companies-reviews';

const CompanyReviewsPage = async () => {
  const response = await getCurrentCompanies();
  const userCurrentCompanies = response?.data?.currentCompanies;

  return (
    <Container>
      <section className="mx-auto flex min-h-[calc(100svh-96px)] max-w-screen-md flex-col gap-4">
        <CompaniesReviewsProvider
          userCurrentCompanies={userCurrentCompanies || []}
        >
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
