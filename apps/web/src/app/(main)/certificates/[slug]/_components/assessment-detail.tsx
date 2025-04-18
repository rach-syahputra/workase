'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useCertificateDetailContext } from '@/context/certificate-detail-context';

interface AssessmentDetailProps {
  className?: string;
}

const AssessmentDetail = ({ className }: AssessmentDetailProps) => {
  const { assessment } = useCertificateDetailContext();

  return (
    <section className={cn(className)}>
      <div className="relative flex flex-col items-start gap-6 py-4 lg:px-4">
        <div className="z-10 flex flex-col gap-2">
          <h2 className="heading-2">{assessment?.skill.title}</h2>

          <div>
            <span className="text-primary-gray text-sm">Topics</span>
            <p>{assessment?.shortDescription}</p>
          </div>

          <Link
            href={`/assessments/${assessment?.slug}`}
            aria-label="Assessment detail page"
            className="text-primary-blue flex w-fit items-center text-sm hover:underline"
          >
            View Assessment Detail
            <ChevronRight size={20} />
          </Link>
        </div>

        {assessment?.image && (
          <Image
            src={assessment?.image}
            alt="Assessment image"
            width={500}
            height={500}
            className="absolute left-4 top-4 aspect-auto w-full max-w-[200px] object-cover opacity-30 transition-all duration-300 ease-in-out group-hover:opacity-50"
          />
        )}
      </div>

      <div className="relative z-10 w-full py-4 lg:px-4">
        <p>
          This certificate is awarded to individuals who have successfully
          passed the assessment as a recognition of their knowledge and skills
          in the respective subject area. It serves as a formal acknowledgment
          of achievement and competence.
        </p>
      </div>
    </section>
  );
};

export default AssessmentDetail;
