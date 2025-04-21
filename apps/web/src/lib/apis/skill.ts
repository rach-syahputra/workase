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
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';
    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.title) queryParams.append('title', req?.title.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token).get(
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
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';

    const response = await axiosPrivate(token).post('/skills', req);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
