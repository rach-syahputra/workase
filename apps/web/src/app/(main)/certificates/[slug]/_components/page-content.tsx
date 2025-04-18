'use client';

import { useEffect } from 'react';

import { useCertificateDetailContext } from '@/context/certificate-detail-context';
import CertificatePreviewSection from './certificate-preview-section';
import CertificateDetailSection from './certificate-detail-section';

interface PageContentProps {
  slug: string;
}

const PageContent = ({ slug }: PageContentProps) => {
  const { fetchGetCertificateDetail } = useCertificateDetailContext();

  useEffect(() => {
    fetchGetCertificateDetail(slug);
  }, [slug]);

  return (
    <div className="flex min-h-[calc(100svh-68px)] w-full flex-col">
      <CertificatePreviewSection />
      <CertificateDetailSection />
    </div>
  );
};

export default PageContent;
