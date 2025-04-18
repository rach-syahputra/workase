export interface GenerateCertificateTokenRequest {
  userAssessmentId: string;
  userName: string;
}

export interface AddCertificateRequest {
  userAssessmentId: string;
  pdf: File;
  slug: string;
}

export interface GetCertificateDetailRequest {
  slug: string;
}
