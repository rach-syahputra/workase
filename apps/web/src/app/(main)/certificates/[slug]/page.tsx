import { Metadata } from 'next';

import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import { getCertificateMetadata } from '@/lib/apis/certificate';
import { CertificateDetailProvider } from '@/context/certificate-detail-context';
import PageContent from './_components/page-content';

interface CertificateDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: CertificateDetailPageProps): Promise<Metadata> => {
  const slug = (await params).slug;
  const response = await getCertificateMetadata({ slug });
  const certificate = response.data?.certificate;

  return {
    title: 'Certificate — Workase',
    description: `View a verified certificate earned by a ${certificate?.userSlug || 'a user'} on Workase. This credential highlights their ${certificate?.skillTitle || 'professional'} skill and confirms successful completion of an official assessment.`,
    openGraph: {
      title: 'Certificate — Workase',
      description: `View a verified certificate earned by ${certificate?.userSlug || 'a user'} on Workase. This credential highlights their ${certificate?.skillTitle || 'professional'} skill and confirms successful completion of an official assessment.`,
      url: CLIENT_BASE_URL,
      type: 'website',
      siteName: 'Workase Job Board',
      images: [
        {
          url: '/certificate-template.png',
          secureUrl: '/certificate-template.png',
          width: 1200,
          height: 630,
          alt: 'Workase Job Board',
        },
      ],
    },
    metadataBase: new URL(CLIENT_BASE_URL),
  };
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
