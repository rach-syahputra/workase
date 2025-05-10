import { Metadata } from 'next';

import { getCvBySlug } from '@/lib/apis/cv';
import { CvEditFormProvider } from '@/context/cv-edit-form-context';
import PageContent from './_components/page-content';
import { CLIENT_BASE_URL } from '@/lib/constants/constants';

interface CvEditPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: 'CV Generator — Workase',
  description:
    'Create a professional CV in minutes with Workase. Highlight your strengths, and download your resume to stand out in the job market.',
  openGraph: {
    title: 'CV Generator — Workase',
    description:
      'Create a professional CV in minutes with Workase. Highlight your strengths, and download your resume to stand out in the job market.',
    url: CLIENT_BASE_URL,
    type: 'website',
    siteName: 'Workase Job Board',
    images: [
      {
        url: '/workase-sm-bg-black.png',
        secureUrl: '/workase-sm-bg-black.png',
        width: 1200,
        height: 630,
        alt: 'Workase Job Board',
      },
    ],
  },
  metadataBase: new URL(CLIENT_BASE_URL),
};

const AssessmentDetailPage = async ({ params }: CvEditPageProps) => {
  const slug = (await params).slug;
  const response = await getCvBySlug({ slug });

  return (
    <CvEditFormProvider cv={response.data?.cv!}>
      <PageContent />
    </CvEditFormProvider>
  );
};

export default AssessmentDetailPage;
