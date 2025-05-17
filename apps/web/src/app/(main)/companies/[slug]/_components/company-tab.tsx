import { Pagination } from '@/lib/interfaces/companies';
import { Job } from '@/context/search-job-context';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs';
import CompanyOverview from './company-overview';
import CompanyJobPosted from './company-job-posted';
import CompanyReviews from './company-reviews';

interface CompanyTabProps {
  companyDescription: string;
  companyJobs: Job[];
  companyPagination: Pagination;
  handleJobPageChange: (page: number) => void;
}

const CompanyTab = ({
  companyDescription,
  companyJobs,
  companyPagination,
  handleJobPageChange,
}: CompanyTabProps) => {
  return (
    <Tabs defaultValue="overview" className="mt-4 w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="overview" className="w-full md:w-auto md:px-8">
          Overview
        </TabsTrigger>
        <TabsTrigger value="jobPosted" className="w-full md:w-auto md:px-8">
          Job Posted
        </TabsTrigger>
        <TabsTrigger value="reviews" className="w-full md:w-auto md:px-8">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <CompanyOverview description={companyDescription} />
      </TabsContent>
      <TabsContent value="jobPosted">
        <CompanyJobPosted
          jobs={companyJobs}
          pagination={companyPagination}
          handlePageChange={handleJobPageChange}
        />
      </TabsContent>
      <TabsContent value="reviews">
        <CompanyReviews />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyTab;
