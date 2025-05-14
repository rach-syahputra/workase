import { Metadata } from 'next';

import { getCertificateMetadata } from '@/lib/apis/certificate';
import { CertificateDetailProvider } from '@/context/certificate-detail-context';
import PageContent from './_components/page-content';

interface CertificateDetailPageProps {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: CertificateDetailPageProps): Promise<Metadata> => {
  const slug = params.slug;
  const response = await getCertificateMetadata({ slug });
  const certificate = response.data?.certificate;

  return {
    title: 'Certificate — Workase',
    description: `View a verified certificate earned by a ${certificate?.userSlug || 'a user'} on Workase. This credential highlights their ${certificate?.skillTitle || 'professional'} skill and confirms successful completion of an official assessment.`,
    openGraph: {
      title: 'Certificate — Workase',
      description: `View a verified certificate earned by ${certificate?.userSlug || 'a user'} on Workase. This credential highlights their ${certificate?.skillTitle || 'professional'} skill and confirms successful completion of an official assessment.`,
      url: `https://workase.vercel.app/certificates/${slug}`,
      type: 'website',
      siteName: 'Workase Job Board',
      images: [
        {
          url: '/certificate-template.png',
          secureUrl: '/certificate-template.png',
          width: 1056,
          height: 816,
          alt: 'Workase Job Board',
        },
      ],
    },
    alternates: {
      canonical: `https://workase.vercel.app/certificates/${slug}`,
    },
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
