import { IAssessment } from '../assessment';
import {
  ICertificate,
  ICertificateMetadata,
  ICertificateOwner,
  ICertificateToken,
} from '../certificate';
import { APIResponse } from './response';

export interface GenerateCertificateTokenResponse extends APIResponse {
  data?: {
    certificateToken: ICertificateToken;
  };
}

export interface AddCertificateResponse extends APIResponse {
  data?: {
    certificate: ICertificate;
  };
}

export interface GetCertificateDetailResponse extends APIResponse {
  data?: {
    certificate: ICertificate;
    owner: ICertificateOwner;
    assessment: IAssessment;
  };
}

export interface GetCertificateMetadataResponse extends APIResponse {
  data?: {
    certificate: ICertificateMetadata;
  };
}
