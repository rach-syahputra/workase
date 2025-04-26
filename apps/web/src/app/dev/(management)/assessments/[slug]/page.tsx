import { AssessmentQuestionProvider } from '@/context/assessment-question-context';
import { BrowseAssessmentProvider } from '@/context/browse-assessment-context';
import PageContent from './_components/page-content';

interface AssessmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const slug = (await params).slug;

  return (
    <AssessmentQuestionProvider slug={slug}>
      <BrowseAssessmentProvider slug={slug}>
        <PageContent slug={slug} />
      </BrowseAssessmentProvider>
    </AssessmentQuestionProvider>
  );
};

export default AssessmentDetailPage;
