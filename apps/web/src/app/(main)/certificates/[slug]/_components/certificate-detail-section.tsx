'use client';

import { useCertificateDetailContext } from '@/context/certificate-detail-context';
import Container from '@/components/layout/container';
import AssessmentDetail from './assessment-detail';
import CertificateOwner from './certificate-owner';
import AssessmentDetailSkeleton from './assessment-detail-skeleton';
import CertificateOwnerSkeleton from './certificate-owner-skeleton';

const CertificateDetailSection = () => {
  const { isLoading } = useCertificateDetailContext();

  return (
    <div className="w-full bg-white">
      <Container className="py-8">
        <article className="group relative grid w-full flex-col items-start gap-8 lg:grid-cols-4">
          {isLoading ? (
            <>
              <AssessmentDetailSkeleton className="lg:col-span-3" />
              <CertificateOwnerSkeleton className="lg:col-span-1" />
            </>
          ) : (
            <>
              <AssessmentDetail className="lg:col-span-3" />
              <CertificateOwner className="lg:col-span-1" />
            </>
          )}
        </article>
      </Container>
    </div>
  );
};

export default CertificateDetailSection;
