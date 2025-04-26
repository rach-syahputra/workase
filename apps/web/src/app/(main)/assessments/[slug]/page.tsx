import PageContent from './_components/page-content';

interface AssessmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const slug = (await params).slug;

  return <PageContent slug={slug} />;
};

export default AssessmentDetailPage;
