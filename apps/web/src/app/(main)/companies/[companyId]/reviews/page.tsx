import { getCompanyHeader } from '@/lib/apis/company-reviews';
import Container from '@/components/layout/container';
import { DetailPageHeader } from '@/components/layout/detail-page-header';
import PageContent from './_components/page-content';

interface CompanyReviewsPageProps {
  params: Promise<{ companyId: string }>;
}

const CompanyReviewsPage = async ({ params }: CompanyReviewsPageProps) => {
  const companyId = (await params).companyId;
  const response = await getCompanyHeader(companyId);
  const companyHeader = response.data?.company;

  return (
    <>
      <DetailPageHeader
        href={`/companies/${companyId}`}
        label={companyHeader?.name as string}
        image={companyHeader?.logoUrl as string}
      />
      <Container className="max-md:px-0">
        <PageContent companyId={companyId} />
      </Container>
    </>
  );
};

export default CompanyReviewsPage;
