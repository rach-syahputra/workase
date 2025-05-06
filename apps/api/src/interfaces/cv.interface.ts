export interface CheckCvOwnershipRequest {
  userId: string;
  cvId: string;
}

export interface GetCvBySlugRequest {
  slug: string;
}

export interface AddCvRequest {
  userId: string;
  data: any;
}

export interface UpdateCvRequest {
  cvId: string;
  userId: string;
  data: any;
}
