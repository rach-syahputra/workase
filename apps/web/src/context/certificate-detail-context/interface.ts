import { Dispatch, SetStateAction } from 'react';

import { ICertificate, ICertificateOwner } from '@/lib/interfaces/certificate';
import { IAssessment } from '@/lib/interfaces/assessment';

export interface ICertificateDetailContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  certificate: ICertificate | null;
  setCertificate: Dispatch<SetStateAction<ICertificate | null>>;
  owner: ICertificateOwner | null;
  setOwner: Dispatch<SetStateAction<ICertificateOwner | null>>;
  assessment: IAssessment | null;
  setAssessment: Dispatch<SetStateAction<IAssessment | null>>;
  fetchGetCertificateDetail: (slug: string) => void;
}
