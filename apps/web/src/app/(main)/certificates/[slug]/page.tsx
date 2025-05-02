import { CertificateDetailProvider } from '@/context/certificate-detail-context';
import PageContent from './_components/page-content';

interface CertificateDetailPageProps {
  params: Promise<{ slug: string }>;
}

const CertificateDetailPage = async ({
  params,
}: CertificateDetailPageProps) => {
  const slug = (await params).slug;

  return (
    <CertificateDetailProvider slug={slug}>
      <PageContent />;
    </CertificateDetailProvider>
  );
};

export default CertificateDetailPage;
