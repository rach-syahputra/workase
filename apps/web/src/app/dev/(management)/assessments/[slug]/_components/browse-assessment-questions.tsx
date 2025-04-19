'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { IAssessmentQuestion } from '@/lib/interfaces/assessment';
import { getAssessmentQuestions } from '@/lib/apis/assessments';
import { scrollToTop } from '@/lib/utils';
import { Input } from '@/components/shadcn-ui/input';
import Icon from '@/components/ui/icon';
import AppPagination from '@/components/ui/pagination';
import { Card } from '@/components/shadcn-ui/card';
import AssessmentQuestionCard from './assessment-question-card';
import AssessmentQuestionCardSkeleton from './assessment-question-card-skeleton';

interface BrowseAssessmentQuestionsProps {
  slug: string;
}

const BrowseAssessmentQuestions = ({
  slug,
}: BrowseAssessmentQuestionsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuestion, setSearchQuestion] = useState<string>('');
  const [debouncedSearchQuestion, setDebouncedSearchQuestion] =
    useState<string>('');
  const [questions, setQuestions] = useState<IAssessmentQuestion[]>([]);
  const limit = 10;

  const fetchAssessmentQuestions = async () => {
    setIsLoading(true);

    const response = await getAssessmentQuestions({
      limit,
      page,
      slug,
      question: debouncedSearchQuestion,
    });

    if (response.success) {
      setQuestions(
        response.data?.assessmentQuestions.map((question, index) => ({
          ...question,
          number: ((page ? page : 1) - 1) * limit + index + 1,
        })) || [],
      );
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setTotalQuestions(response.data?.pagination?.totalData || 0);
      setPage(page || 1);
      scrollToTop();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAssessmentQuestions();
  }, []);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setPage(1);
      setDebouncedSearchQuestion(searchQuestion);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchQuestion]);

  useEffect(() => {
    fetchAssessmentQuestions();
  }, [page, limit, debouncedSearchQuestion]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-2 md:p-5">
      <h2 className="heading-4 font-semibold">Browse Questions</h2>

      <Input
        type="text"
        placeholder="Search questions..."
        onChange={(e) => setSearchQuestion(e.target.value)}
        value={searchQuestion}
        className="w-full md:w-1/2"
      />

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
