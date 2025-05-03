export interface CvData {
  section: string;
  items: any[];
}

export interface CheckCvOwnershipRequest {
  userId: string;
  cvId: string;
}

export interface GetCvBySlugRequest {
  slug: string;
}

export interface AddCvRequest {
  userId: string;
  data: CvData[];
}

export interface UpdateCvRequest {
  cvId: string;
  userId: string;
  data: CvData[];
}
