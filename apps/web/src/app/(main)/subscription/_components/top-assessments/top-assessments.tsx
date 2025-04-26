'use client';

import { useEffect, useState } from 'react';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';

import { IAssessment } from '@/lib/interfaces/assessment';
import { getAssessments } from '@/lib/apis/assessments';
import Container from '@/components/layout/container';
import AssessmentCard from './assessment-card';

const TopAssessments = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assessments, setAssessments] = useState<IAssessment[]>([]);

  const fetchGetAssessments = async () => {
    setIsLoading(true);

    const response = await getAssessments({ limit: 20 });

    if (response.success) {
      setAssessments(response.data?.assessments || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGetAssessments();
  }, []);

  return (
    <Container className="flex w-full max-w-screen-lg flex-col items-start gap-4 md:py-10">
      <div className="text-primary-gray flex w-fit items-end justify-center gap-1.5 font-medium">
        <ChartNoAxesColumnIncreasing size={21} />
        Top Assessments
      </div>
      <div className="grid w-full grid-cols-3 justify-between gap-4 gap-x-8">
        <ul className="col-span-1 flex flex-col gap-4">
          {assessments?.slice(0, 5).map((assessment, index) => (
            <li key={index} className="flex w-full items-start justify-start">
              <AssessmentCard number={index + 1} assessment={assessment} />
            </li>
          ))}
        </ul>
        <ul className="col-span-1 flex flex-col gap-4">
          {assessments?.slice(5, 10).map((assessment, index) => (
            <li key={index} className="flex w-full items-start justify-start">
              <AssessmentCard number={index + 5} assessment={assessment} />
            </li>
          ))}
        </ul>
        <ul className="col-span-1 flex flex-col gap-4">
          {assessments?.slice(10, 15).map((assessment, index) => (
            <li key={index} className="flex w-full items-start justify-start">
              <AssessmentCard number={index + 10} assessment={assessment} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TopAssessments;
