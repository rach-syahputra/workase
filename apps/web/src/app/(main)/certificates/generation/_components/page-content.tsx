'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import jwt from 'jsonwebtoken';

import { addCertificate } from '@/lib/apis/certificate';
import {
  convertBlobToFile,
  convertPdfToBlob,
  formatCertificateDate,
  generateQrCodeUrl,
} from '@/lib/utils';
import {
  ICertificateGeneration,
  ICertificateToken,
} from '@/lib/interfaces/certificate';
import Container from '@/components/layout/container';
import AppLoading from '@/components/ui/app-loading';
import CertificatePdf from './certificate-pdf';

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [certificate, setCertificate] = useState<ICertificateGeneration | null>(
    null,
  );

  const getCertificateTokenData = async () => {
    setIsLoading(true);

    const certificateToken = searchParams.get('token');

    if (typeof certificateToken === 'string') {
      const decodedCertificate = jwt.decode(
        certificateToken,
      ) as ICertificateToken;

      const qrCodeUrl = await generateQrCodeUrl(decodedCertificate.slug);

      setCertificate({
        userAssessment: decodedCertificate.userAssessment,
        createdAt: decodedCertificate.createdAt,
        qrCodeUrl,
        slug: decodedCertificate.slug,
      });
    }

    setIsLoading(false);
  };

  const fetchAddCertificate = async () => {
    if (certificate) {
      // Generate certificate as jsx element
      const doc = (
        <CertificatePdf
          name={certificate.userAssessment.user.name}
          skill={certificate.userAssessment.skill.title}
          qrCodeUrl={certificate.qrCodeUrl}
          slug={certificate.slug}
          date={formatCertificateDate(new Date(certificate.createdAt))}
        />
      );

      // Convert jsx pdf to blob
      const pdfBlob = await convertPdfToBlob(doc);

      // Convert blob pdf to file
      const pdfFile = convertBlobToFile(pdfBlob);

      const response = await addCertificate({
        userAssessmentId: certificate.userAssessment.id,
        pdf: pdfFile,
        slug: certificate.slug,
      });

      if (response.success) {
        router.push(`/certificates/${response.data?.certificate.slug}`);
      }
    }
  };

  useEffect(() => {
    getCertificateTokenData();
  }, []);

  useEffect(() => {
    if (certificate) {
      fetchAddCertificate();
    }
  }, [certificate]);

  return (
    <Container className="flex min-h-[calc(100svh-68px)] items-center justify-center">
      <AppLoading size="md" label="Generating your certificate" />
    </Container>
  );
};

export default PageContent;
