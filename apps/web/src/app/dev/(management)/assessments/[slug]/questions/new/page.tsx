import { getAssessmentBySlug } from '@/lib/apis/assessments';
import PageContent from './_components/page-content';

interface CreateQuestionPageProps {
  params: Promise<{ slug: string }>;
}

const CreateQuestionPage = async ({ params }: CreateQuestionPageProps) => {
  const slug = (await params).slug;
  const response = await getAssessmentBySlug({ slug });

  return <PageContent assessmentId={response.data?.assessment.id!} />;
};

export default CreateQuestionPage;
