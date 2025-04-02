import { Request } from 'express';

export type RoleType = 'USER' | 'ADMIN' | 'DEVELOPER';

export interface UserToken {
  id: string;
  email: string;
  jobId: string;
  role: RoleType;
}

export interface UserRequest extends Request {
  user?: UserToken;
}
