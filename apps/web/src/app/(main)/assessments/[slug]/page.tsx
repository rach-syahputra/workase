import { auth } from '@/auth';
import { Metadata } from 'next';
import PageContent from './_components/page-content';
import { getAssessmentBySlug } from '@/lib/apis/assessments';

interface AssessmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: AssessmentDetailPageProps): Promise<Metadata> => {
  const session = await auth();
  const slug = (await params).slug;
  const response = await getAssessmentBySlug({
    isOnClient: false,
    slug,
    token: session?.user?.accessToken || '',
  });
  const assessment = response.data?.assessment;
  const skillTitle = assessment?.skill.title;

  return {
    title: `${skillTitle ? skillTitle : 'Assessment'} — Workase`,
    description:
      'Learn more about this professional assessment on Workase. Test your skills, validate your expertise, and earn a certificate to boost your career opportunities.',
  };
};

const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const slug = (await params).slug;

  return <PageContent slug={slug} />;
};

export default AssessmentDetailPage;
