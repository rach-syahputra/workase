import { Metadata } from 'next';
import CreateCompanyReviewForm from './_components/create-company-review-form';

export const metadata: Metadata = {
  title: 'Post Reviews — Workase',
  description:
    'Post your honest reviews and ratings about companies on Workase to guide job seekers in their decisions.',
};

const CreateCompanyReviewPage = () => {
  return <CreateCompanyReviewForm />;
};

export default CreateCompanyReviewPage;
