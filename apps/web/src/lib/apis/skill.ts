import { getSession } from 'next-auth/react';
import { axiosPrivate } from '../axios';
import {
  AddSkillRequest,
  GetSkillRequest,
} from '../interfaces/api-request/skill';
import {
  AddSkillResponse,
  GetSkillsResponse,
} from '../interfaces/api-response/skill';
import { handleApiError } from './error';

export const getSkills = async (
  req?: GetSkillRequest,
): Promise<GetSkillsResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.title) queryParams.append('title', req?.title.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token || '').get(
      `/skills${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addSkill = async (
  req?: AddSkillRequest,
): Promise<AddSkillResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').post('/skills', req);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
