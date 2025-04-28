import UserDashboardContainer from '@/components/user-dashboard/user-dashboard-container';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import PageContent from './_components/page-content';

interface PaymentPageProps {
  params: Promise<{ slug: string }>;
}

const PaymentPage = async ({ params }: PaymentPageProps) => {
  const slug = (await params).slug;

  return (
    <UserDashboardContainer className="min-h-[calc(100svh-108px)]">
      <UserDashboardHeader
        title="Payment"
        description="Submit your payment to continue your subscription."
      />
      <PageContent slug={slug} />
    </UserDashboardContainer>
  );
};

export default PaymentPage;
