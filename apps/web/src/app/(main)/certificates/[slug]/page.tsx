import { Metadata } from 'next';

import { CertificateDetailProvider } from '@/context/certificate-detail-context';
import PageContent from './_components/page-content';

interface CertificateDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: 'Certificate — Workase',
  description:
    'View a verified certificate earned by a user on Workase. This credential showcases their skills and successful completion of a professional assessment.',
};

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
