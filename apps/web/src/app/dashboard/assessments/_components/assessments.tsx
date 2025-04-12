'use client';

import { Card } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import AssessmentCard from './assessment-card';
import { useAssessmentContext } from '@/context/assessment-context';
import { useEffect, useState } from 'react';
import AssessmentCardSkeleton from './assessment-card-skeleton';
import AppPagination from '@/components/ui/pagination';

const Assessments = () => {
  const {
    isLoading,
    searchSkill,
    setSearchSkill,
    debouncedSearchSkill,
    page,
    totalPages,
    fetchAssessments,
    assessments,
  } = useAssessmentContext();
  const limit = 9;

  useEffect(() => {
    fetchAssessments(1, limit);
  }, []);

  useEffect(() => {
    fetchAssessments(page, limit);
  }, [debouncedSearchSkill]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <Input
        type="text"
        placeholder="Search assessments..."
        onChange={(e) => setSearchSkill(e.target.value)}
        value={searchSkill}
        className="w-full md:w-1/2"
      />

      <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <AssessmentCardSkeleton />
            <AssessmentCardSkeleton />
            <AssessmentCardSkeleton />
          </>
        ) : assessments?.length ? (
          <>
            {assessments.map((assessment, index) => (
              <AssessmentCard key={index} assessment={assessment} />
            ))}
            {totalPages > 1 && (
              <AppPagination
                page={page}
                onPageChange={(page) => fetchAssessments(page, limit)}
                totalPages={totalPages}
                className="mt-2"
              />
            )}
          </>
        ) : (
          <div className="text-primary-gray flex h-60 w-full items-center justify-center">
            No available assessments.
          </div>
        )}
      </div>
    </Card>
  );
};

export default Assessments;
