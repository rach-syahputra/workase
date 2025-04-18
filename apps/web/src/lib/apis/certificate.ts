import axios from 'axios';

import { axiosPublic } from '../axios';
import {
  AddCertificateRequest,
  GenerateCertificateTokenRequest,
  GetCertificateDetailRequest,
} from '../interfaces/api-request/certificate';
import {
  AddCertificateResponse,
  GenerateCertificateTokenResponse,
  GetCertificateDetailResponse,
} from '../interfaces/api-response/certificate';
import { API_BASE_URL } from '../constants/constants';
import { handleApiError } from './error';

export const generateCertificateToken = async (
  req: GenerateCertificateTokenRequest,
): Promise<GenerateCertificateTokenResponse> => {
  try {
    // TO DO: retrieve token from session
    const response = await axiosPublic.post(`/certificates/token`, req);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addCertificate = async (
  req: AddCertificateRequest,
): Promise<AddCertificateResponse> => {
  try {
    // TO DO: retrieve token from session

    const formData = new FormData();
    formData.append('userAssessmentId', req?.userAssessmentId || '');
    if (req?.pdf) {
      formData.append('pdf', req.pdf);
    }
    formData.append('slug', req?.slug || '');

    const response = await axios.post('/certificates', formData, {
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCertificateDetail = async (
  req?: GetCertificateDetailRequest,
): Promise<GetCertificateDetailResponse> => {
  try {
    // TO DO: retrieve token from session

    const response = await axiosPublic.get(`/certificates/${req?.slug}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
