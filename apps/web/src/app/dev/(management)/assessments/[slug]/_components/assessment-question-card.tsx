import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { IAssessmentQuestion } from '@/lib/interfaces/assessment';
import { Card } from '@/components/shadcn-ui/card';
import Icon from '@/components/ui/icon';
import QuestionImage from './question-image';

interface AssessmentQuestionCardProps {
  label: string;
  question: IAssessmentQuestion;
}

const AssessmentQuestionCard = ({
  label,
  question,
}: AssessmentQuestionCardProps) => {
  return (
    <Card className="flex flex-col gap-3 py-4 md:p-4">
      <div className="mb-2 flex w-full items-start justify-between">
        <p className="rounded-md bg-blue-700/30 px-2 py-1 text-xs font-medium">
          {label}
        </p>
        <div className="justify-center1 flex items-center">
          <div className="flex aspect-square h-8 w-8 cursor-pointer items-center justify-center">
            <Icon icon={faPenToSquare} className="text-primary-dark w-4" />
          </div>
          <div className="flex aspect-square h-8 w-8 cursor-pointer items-center justify-center">
            <Icon icon={faTrash} className="text-primary-dark w-[13px]" />
          </div>
        </div>
      </div>
      {question.image && <QuestionImage label={label} image={question.image} />}
      <p className="font-semibold">{question.question}</p>
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={cn(
              'flex w-fit items-center justify-center rounded-md border border-gray-300 px-2.5 py-1 text-sm',
              {
                'border-white bg-green-700 text-white': option.isCorrect,
              },
            )}
          >
            {option.option}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssessmentQuestionCard;
