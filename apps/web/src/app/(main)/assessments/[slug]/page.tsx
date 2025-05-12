import { Metadata } from 'next';

import { getAssessmentMetadata } from '@/lib/apis/assessments';
import { CLIENT_BASE_URL } from '@/lib/constants/constants';
import PageContent from './_components/page-content';

interface AssessmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: AssessmentDetailPageProps): Promise<Metadata> => {
  const slug = (await params).slug;
  const response = await getAssessmentMetadata({
    slug,
  });
  const assessment = response?.data?.assessment;
  const description = assessment?.shortDescription;
  const skillTitle = assessment?.skillTitle;

  return {
    title: `${skillTitle ? `${skillTitle} Assessment` : 'Assessment'} — Workase`,
    description:
      `Learn more about ${skillTitle ? skillTitle : 'this professional'} assessment on Workase. ${description}`.trim(),
    openGraph: {
      title: `${skillTitle ? `${skillTitle} Assessment` : 'Assessment'} — Workase`,
      description:
        `Learn more about ${skillTitle ? skillTitle : 'this professional'} assessment on Workase. ${description}`.trim(),
      url: CLIENT_BASE_URL,
      type: 'website',
      siteName: 'Workase Job Board',
      images: [
        {
          url: '/workase-sm-bg-black.png',
          secureUrl: '/workase-sm-bg-black.png',
          width: 630,
          height: 630,
          alt: 'Workase Job Board',
        },
      ],
    },
    metadataBase: new URL(CLIENT_BASE_URL),
  };
};

const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const slug = (await params).slug;

  return <PageContent slug={slug} />;
};

export default AssessmentDetailPage;
