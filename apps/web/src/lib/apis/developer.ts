import { axiosPublic } from '../axios';
import { DeveloperLoginRequest } from '../interfaces/api-request/developer';
import { DeveloperLoginResponse } from '../interfaces/api-response/developer';
import { handleApiError } from './error';

export const developerLogin = async (
  req: DeveloperLoginRequest,
): Promise<DeveloperLoginResponse> => {
  try {
    const response = await axiosPublic.post('/developers/auth', req);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
