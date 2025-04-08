import PageContent from './_components/page-content';

interface CreateQuestionPageProps {
  params: Promise<{ assessmentId: string }>;
}

const CreateQuestionPage = async ({ params }: CreateQuestionPageProps) => {
  const assessmentId = (await params).assessmentId;

  return <PageContent assessmentId={assessmentId} />;
};

export default CreateQuestionPage;
