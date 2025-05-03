export interface ICertificateToken {
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

export interface ICertificateGeneration extends ICertificateToken {
  qrCodeUrl: string;
}

export interface ICertificate {
  id: string;
  slug: string;
  userAssessmentId: string;
  url: string;
  createdAt: string;
  isDeleted: boolean;
}

export interface ICertificateOwner {
  id: string;
  email: string;
  slug: string;
  profilePhoto: string;
}
