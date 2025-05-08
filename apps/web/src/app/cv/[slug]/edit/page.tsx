import { Metadata } from 'next';

import { getCvBySlug } from '@/lib/apis/cv';
import { CvEditFormProvider } from '@/context/cv-edit-form-context';
import PageContent from './_components/page-content';

interface CvEditPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: 'CV Generator — Workase',
  description:
    'Create a professional CV in minutes with Workase. Highlight your strengths, and download your resume to stand out in the job market.',
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
