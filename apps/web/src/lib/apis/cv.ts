import { getSession } from 'next-auth/react';

import { axiosPrivate, axiosPublic } from '../axios';
import {
  GetCvBySlugRequest,
  UpdateCvRequest,
} from '../interfaces/api-request/cv';
import {
  GetCvBySlugResponse,
  UpdateCvResponse,
} from '../interfaces/api-response/cv';
import { handleApiError } from './error';

export const getCvBySlug = async (
  req: GetCvBySlugRequest,
): Promise<GetCvBySlugResponse> => {
  try {
    const response = await axiosPublic.get(`/cvs/${req.slug}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCv = async (
  req: UpdateCvRequest,
): Promise<UpdateCvResponse> => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  try {
    const response = await axiosPrivate(token || '').patch(`/cvs/${req.cvId}`, {
      data: req.data,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
