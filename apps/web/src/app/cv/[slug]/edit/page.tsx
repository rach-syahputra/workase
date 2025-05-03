import { getCvBySlug } from '@/lib/apis/cv';
import { CvEditFormProvider } from '@/context/cv-edit-form-context';
import PageContent from './_components/page-content';

interface AssessmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

const AssessmentDetailPage = async ({ params }: AssessmentDetailPageProps) => {
  const slug = (await params).slug;
  const response = await getCvBySlug({ slug });

  return (
    <CvEditFormProvider cv={response.data?.cv!}>
      <PageContent />
    </CvEditFormProvider>
  );
};

export default AssessmentDetailPage;
