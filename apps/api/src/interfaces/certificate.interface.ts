export interface GenerateCertificateTokenRequest {
  userAssessmentId: string;
  userName: string;
}

export interface CertificateTokenData {
  userAssessment: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    skill: {
      id: string;
      title: string;
    };
  };

  createdAt: string;
  slug: string;
}

export interface AddCertificateRequest {
  slug?: string;
  userAssessmentId: string;
}

export interface AddCertificateServiceRequest extends AddCertificateRequest {
  pdf: Express.Multer.File;
}

export interface AddCertificateRepositoryRequest extends AddCertificateRequest {
  url: string;
}

export interface GetCertificateBySlugRequest {
  slug: string;
}

export interface GetCertificateDetailRequest {
  slug: string;
}

export interface GetCertificateMetadataRequest {
  slug: string;
}
