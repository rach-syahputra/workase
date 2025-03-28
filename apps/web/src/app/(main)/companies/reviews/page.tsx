import Container from '@/components/layout/container';
import SearchInput from './_components/search-input';
import CreateCompanyReviewModal from './_components/create-company-review-modal';

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
