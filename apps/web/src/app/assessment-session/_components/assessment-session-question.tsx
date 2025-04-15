'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useAssessmentSessionContext } from '@/context/assessment-session-context';
import { Card } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import AssessmentSessionCard from './assessment-session-card';

const AssessmentSessionQuestion = () => {
  return (
    <Card
      className={cn(
        'mx-auto mt-[calc(var(--assessment-session-header-height)+32px)] flex w-full max-w-screen-lg flex-1 flex-col gap-12 bg-white max-md:border-none max-md:shadow-none md:gap-6 md:px-5 md:py-4',
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <AssessmentSessionQuestionCard />
        <div className="w-full items-center justify-between gap-2 md:grid md:grid-cols-2 md:gap-4">
          <AssessmentSessionAnswerCard />
          <AssessmentSessionOptionsCard />
        </div>
      </div>
    </Card>
  );
};

const AssessmentSessionQuestionCard = () => {
  const { currentQuestion } = useAssessmentSessionContext();

  return currentQuestion ? (
    <AssessmentSessionCard className="flex w-full flex-col items-center justify-center gap-2">
      <span className="text-sm">
        Question No. {currentQuestion?.number || 0}
      </span>
      <p className="font-medium">{currentQuestion?.question}</p>
      {currentQuestion?.image && (
        <Image
          src={currentQuestion?.image}
          alt="Question Image"
          width={1000}
          height={1000}
          className="bg-primary-gray-background aspect-auto h-auto w-auto rounded-md object-cover md:max-h-[400px] md:max-w-[600px]"
        />
      )}
      <span className="text-primary-gray text-xs">
        Question {currentQuestion?.number || 0}/25
      </span>
    </AssessmentSessionCard>
  ) : null;
};

const AssessmentSessionAnswerCard = () => {
  return (
    <AssessmentSessionCard className="flex h-full w-full items-start justify-start text-[15px]">
      Choose the correct answer.
    </AssessmentSessionCard>
  );
};

const AssessmentSessionOptionsCard = () => {
  const { page, currentQuestion, handleSelectOption } =
    useAssessmentSessionContext();

  return (
    <AssessmentSessionCard className="flex items-center justify-center">
      <ul className="flex w-full flex-col gap-2">
        {currentQuestion?.options.map((option, index) => {
          // const isSelected = index === selectedOptionIndex;
          const isSelected = option.id === currentQuestion.selectedOption.id;

          return (
            <li key={index} className="group w-full">
              <Card
                className={cn('w-full hover:border-green-500', {
                  'border-green-500 bg-green-200': isSelected,
                })}
              >
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleSelectOption({
                      number: page,
                      optionId: option.id,
                      questionId: currentQuestion.id,
                    });
                  }}
                  className={cn(
                    'min-h-fit w-full text-wrap p-6 text-gray-700 group-hover:bg-green-100 group-hover:text-green-500',
                    {
                      'text-green-700': isSelected,
                    },
                  )}
                >
                  {option.option}
                </Button>
              </Card>
            </li>
          );
        })}
      </ul>
    </AssessmentSessionCard>
  );
};

export default AssessmentSessionQuestion;
