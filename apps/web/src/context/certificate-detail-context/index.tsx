'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICertificate, ICertificateOwner } from '@/lib/interfaces/certificate';
import { getCertificateDetail } from '@/lib/apis/certificate';
import { IAssessment } from '@/lib/interfaces/assessment';
import { ICertificateDetailContext } from './interface';

const CertificateDetailContext = createContext<
  ICertificateDetailContext | undefined
>(undefined);

const CertificateDetailProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [certificate, setCertificate] = useState<ICertificate | null>(null);
  const [owner, setOwner] = useState<ICertificateOwner | null>(null);
  const [assessment, setAssessment] = useState<IAssessment | null>(null);

  const fetchGetCertificateDetail = useCallback(async () => {
    setIsLoading(true);

    const response = await getCertificateDetail({ slug });
    const certificateRes = response.data?.certificate;
    const ownerRes = response.data?.owner;
    const assessmentRes = response.data?.assessment;

    if (response.success && certificateRes && ownerRes && assessmentRes) {
      setCertificate(certificateRes);
      setOwner(ownerRes);
      setAssessment(assessmentRes);
    }

    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchGetCertificateDetail();
  }, [fetchGetCertificateDetail]);

  return (
    <CertificateDetailContext.Provider
      value={{
        isLoading,
        setIsLoading,
        certificate,
        setCertificate,
        owner,
        setOwner,
        assessment,
        setAssessment,
        fetchGetCertificateDetail,
      }}
    >
      {children}
    </CertificateDetailContext.Provider>
  );
};

const useCertificateDetailContext = (): ICertificateDetailContext => {
  const context = useContext(CertificateDetailContext);
  if (context === undefined) {
    throw new Error(
      'useCertificateDetailContext must be used within a CertificateDetailProvider',
    );
  }
  return context;
};

export { CertificateDetailProvider, useCertificateDetailContext };
