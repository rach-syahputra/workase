'use client';

import { useCertificateDetailContext } from '@/context/certificate-detail-context';
import Container from '@/components/layout/container';
import CertificateSkeleton from './certificate-skeleton';
import CertificatePreview from './certificate-preview';

const CertificatePreviewSection = () => {
  const { isLoading, certificate } = useCertificateDetailContext();

  return (
    <div className="bg-primary-gray-background w-full">
      <Container className="py-8">
        {isLoading ? (
          <CertificateSkeleton />
        ) : certificate?.url ? (
          <CertificatePreview certificateUrl={certificate.url} />
        ) : (
          <center className="py-20">No certificate.</center>
        )}
      </Container>
    </div>
  );
};

export default CertificatePreviewSection;
