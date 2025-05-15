import { API_BASE_URL } from '../constants/constants';
import { DeveloperLoginRequest } from '../interfaces/api-request/developer';
import { DeveloperLoginResponse } from '../interfaces/api-response/developer';
import { handleApiError } from './error';

export const developerLogin = async (
  req: DeveloperLoginRequest,
): Promise<DeveloperLoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/developers/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
