import { getSession } from 'next-auth/react';

import { axiosPrivate, axiosPublic } from '../axios';
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
import { handleApiError } from './error';

export const generateCertificateToken = async (
  req: GenerateCertificateTokenRequest,
): Promise<GenerateCertificateTokenResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').post(
      `/certificates/token`,
      req,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addCertificate = async (
  req: AddCertificateRequest,
): Promise<AddCertificateResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const formData = new FormData();
    formData.append('userAssessmentId', req?.userAssessmentId || '');
    if (req?.pdf) {
      formData.append('pdf', req.pdf);
    }
    formData.append('slug', req?.slug || '');

    const response = await axiosPrivate(
      token || '',
      'multipart/form-data',
    ).post('/certificates', formData);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCertificateDetail = async (
  req?: GetCertificateDetailRequest,
): Promise<GetCertificateDetailResponse> => {
  try {
    const response = await axiosPublic.get(`/certificates/${req?.slug}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
