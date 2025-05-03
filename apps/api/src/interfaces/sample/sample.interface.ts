export interface GetSampleByEmailRequest {
  email: string;
}

interface AddSampleRequest {
  name: string;
  email: string;
  password: string;
}

export interface AddSampleRequestService extends AddSampleRequest {
  image?: Express.Multer.File;
}

export interface AddSampleRequestRepository extends AddSampleRequest {
  image?: string;
}

export interface LoginSampleRequest {
  email: string;
  password: string;
}
