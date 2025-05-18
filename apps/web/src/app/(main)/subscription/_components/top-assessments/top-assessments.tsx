'use client';

import { useEffect, useState } from 'react';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';

import { ITopAssessment } from '@/lib/interfaces/assessment';
import { getTopAssessments } from '@/lib/apis/assessments';
import Container from '@/components/layout/container';
import AssessmentCard from './assessment-card';

const TopAssessments = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topAssessments, setTopAssessments] = useState<ITopAssessment[]>([]);

  const fetchGetTopAssessments = async () => {
    setIsLoading(true);

    const response = await getTopAssessments();

    if (response.success) {
      setTopAssessments(response.data?.topAssessments || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchGetTopAssessments();
  }, []);

  return (
    <Container className="flex w-full max-w-screen-lg flex-col items-start gap-4 md:py-10">
      <div className="text-primary-gray flex w-fit items-end justify-center gap-1.5 font-medium">
        <ChartNoAxesColumnIncreasing size={21} />
        Top Assessments
      </div>
      <div className="grid w-full grid-cols-1 justify-between gap-4 gap-x-8 lg:grid-cols-3">
        <ul className="col-span-1 flex flex-col gap-4">
          {topAssessments?.slice(0, 5).map((assessment, index) => (
            <li key={index} className="flex w-full items-start justify-start">
              <AssessmentCard number={index + 1} assessment={assessment} />
            </li>
          ))}
        </ul>
        <ul className="col-span-1 flex flex-col gap-4">
          {topAssessments?.slice(5, 10).map((assessment, index) => (
            <li key={index} className="flex w-full items-start justify-start">
              <AssessmentCard number={index + 6} assessment={assessment} />
            </li>
          ))}
        </ul>
        <ul className="col-span-1 flex flex-col gap-4">
          {topAssessments?.slice(10, 15).map((assessment, index) => (
            <li key={index} className="flex w-full items-start justify-start">
              <AssessmentCard number={index + 11} assessment={assessment} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default TopAssessments;
