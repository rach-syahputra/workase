import { NotepadText, Timer, Users } from 'lucide-react';

import { IAssessment } from '@/lib/interfaces/assessment';
import Container from '@/components/layout/container';
import BackgroundElements from './background-elements';
import StartAssessmentModal from './start-assessment-modal';

interface AssessmentProps {
  assessment: IAssessment;
}

const Assessment = ({ assessment }: AssessmentProps) => {
  return (
    <Container className="relative flex min-h-[calc(100svh-68px)] w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-medium">Get certified as a</p>
          <h1 className="heading-1">{assessment.skill.title}</h1>
        </div>
        <p className="w-full max-w-[90%] md:max-w-[55%]">
          {assessment.shortDescription}{' '}
        </p>
      </div>

      <div className="border-primary-gray mx-auto h-0.5 w-full max-w-[80%] border-t border-dashed opacity-50"></div>

      <StartAssessmentModal
        slug={assessment.slug}
        assessmentId={assessment.id}
      />

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="flex items-center justify-center gap-2">
          <Users size={20} />
          <span className="text-sm">
            Enrolled by {assessment.totalAttemptsByUser} users
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Timer size={20} />
          <span className="text-sm">30 minutes</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <NotepadText size={20} />
          <span className="text-sm">25 questions</span>
        </div>
      </div>
      <BackgroundElements />
    </Container>
  );
};

export default Assessment;
