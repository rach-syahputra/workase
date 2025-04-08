import PageContent from './_components/page-content';

interface AssessmentDetailPageProps {
  params: Promise<{ assessmentId: string }>;
}

const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const assessmentId = (await params).assessmentId;

  return <PageContent assessmentId={assessmentId} />;
};

export default AssessmentDetailPage;
