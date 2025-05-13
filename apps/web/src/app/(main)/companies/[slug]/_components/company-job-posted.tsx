import { Pagination } from '@/types/companies';
import { Job } from '@/context/search-job-context';
import JobCard from '@/app/(main)/example/_components/card';
import { CompanyJobsPagination } from './company-jobs-pagination';

interface CompanyJobPostedProps {
  jobs: Job[];
  pagination: Pagination;
  handlePageChange: (page: number) => void;
}

const CompanyJobPosted = ({
  jobs,
  pagination,
  handlePageChange,
}: CompanyJobPostedProps) => {
  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-[90%] pt-[12px] md:pt-0 lg:max-w-[90%]">
        {jobs.length > 0 && (
          <>
            <div className="my-4">
              {jobs.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {jobs.map((job) => (
                    <JobCard
                      id={job.id}
                      slug={job.slug}
                      description={job.description}
                      title={job.title}
                      location={job.company.location}
                      category={job.category}
                      companyName={job.company.name}
                      createdAt={job.createdAt}
                      key={job.id}
                      logoUrl={job.company.logoUrl}
                    />
                  ))}
                </div>
              )}
            </div>
            {pagination.totalPage > 1 && (
              <CompanyJobsPagination
                {...pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyJobPosted;
