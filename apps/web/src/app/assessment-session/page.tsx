import { Metadata } from 'next';
import PageContent from './_components/page-content';

export const metadata: Metadata = {
  title: 'Assessment Session — Workase',
  description:
    'You are now taking a Workase assessment. Answer all questions carefully to complete the session and earn your certificate.',
};

const AssessmentSessionPage = async () => {
  return (
    <div className="bg-primary-gray-background min-h-screen w-full pb-8">
      <PageContent />
    </div>
  );
};

export default AssessmentSessionPage;
