'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useBrowseAssessmentQuestionContext } from '@/context/browse-assessment-context';
import { Input } from '@/components/shadcn-ui/input';
import Icon from '@/components/ui/icon';
import AppPagination from '@/components/ui/pagination';
import { Card } from '@/components/shadcn-ui/card';
import AssessmentQuestionCard from './assessment-question-card';
import AssessmentQuestionCardSkeleton from './assessment-question-card-skeleton';
import AssessmentQuestionsOrderSelect from './assessment-questions-order-select';

interface BrowseAssessmentQuestionsProps {
  slug: string;
}

const BrowseAssessmentQuestions = ({
  slug,
}: BrowseAssessmentQuestionsProps) => {
  const {
    isLoading,
    totalPages,
    totalQuestions,
    page,
    setPage,
    setDebouncedSearchQuestion,
    searchQuestion,
    setSearchQuestion,
    questions,
    fetchAssessmentQuestions,
  } = useBrowseAssessmentQuestionContext();

  useEffect(() => {
    fetchAssessmentQuestions();
  }, [fetchAssessmentQuestions]);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setPage(1);
      setDebouncedSearchQuestion(searchQuestion);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchQuestion, setDebouncedSearchQuestion, setPage]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 md:p-5">
      <h2 className="heading-4 font-semibold">Browse Questions</h2>

      <div className="flex w-full flex-col gap-2 md:flex-row">
        <Input
          type="text"
          placeholder="Search questions..."
          onChange={(e) => setSearchQuestion(e.target.value)}
          value={searchQuestion}
          className="w-full md:w-1/2"
        />
        <AssessmentQuestionsOrderSelect />
      </div>

      <div className="flex w-full flex-col gap-2">
        {isLoading ? (
          <>
            <AssessmentQuestionCardSkeleton />
            <AssessmentQuestionCardSkeleton />
            <AssessmentQuestionCardSkeleton />
            <AssessmentQuestionCardSkeleton />
          </>
        ) : questions?.length > 0 ? (
          <>
            {questions.map((question, index) => (
              <AssessmentQuestionCard
                key={index}
                label={`Question ${question.number} of ${totalQuestions}`}
                question={question}
              />
            ))}
            <AppPagination
              page={page}
              onPageChange={setPage}
              totalPages={totalPages}
              className="mt-4"
            />
          </>
        ) : (
          <div className="text-primary-gray flex items-center justify-center gap-2 py-16 text-center text-sm">
            <p>No questions added yet.</p>
            <Link
              href={`/dev/assessments/${slug}/questions/new`}
              aria-label="add question page"
              className="hover:text-primary-blue-hover flex items-center justify-center gap-2 transition-all duration-150 ease-in-out"
            >
              Add your first question
              <Icon icon={faArrowRight} className="w-3" />
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BrowseAssessmentQuestions;
