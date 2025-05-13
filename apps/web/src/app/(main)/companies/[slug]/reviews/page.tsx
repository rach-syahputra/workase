import { getCompanyHeader } from '@/lib/apis/company-reviews';
import { CompanyReviewsProvider } from '@/context/company-reviews-context';
import Container from '@/components/layout/container';
import { DetailPageHeader } from '@/components/layout/detail-page-header';
import PageContent from './_components/page-content';

interface CompanyReviewsPageProps {
  params: Promise<{ slug: string }>;
}

const CompanyReviewsPage = async ({ params }: CompanyReviewsPageProps) => {
  const slug = (await params).slug;
  const response = await getCompanyHeader(slug);
  const companyHeader = response.data?.company;

  return (
    <>
      <DetailPageHeader
        href={`/companies/${slug}`}
        label={companyHeader?.name as string}
        image={companyHeader?.logoUrl as string}
        className="top-[52px] z-10 md:top-[68px]"
      />
      <Container className="max-md:px-0">
        <CompanyReviewsProvider slug={slug}>
          <PageContent />
        </CompanyReviewsProvider>
      </Container>
    </>
  );
};

export default CompanyReviewsPage;
