import { getAssessmentBySlug } from '@/lib/apis/assessments';
import PageContent from './_components/page-content';

interface CreateQuestionPageProps {
  params: Promise<{ slug: string }>;
}

const CreateQuestionPage = async ({ params }: CreateQuestionPageProps) => {
  const slug = (await params).slug;
  const response = await getAssessmentBySlug({ isOnClient: false, slug });
  const assessment = response.data?.assessment;

  return assessment ? (
    <PageContent assessment={assessment} />
  ) : (
    <center className="p-10">
      Something went wrong when retrieve assessment data
    </center>
  );
};

export default CreateQuestionPage;
