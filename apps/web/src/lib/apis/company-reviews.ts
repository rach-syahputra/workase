import { AddCompanyReviewRequest } from '../interfaces/api-request/company-review';
import { AddCompanyReviewResponse } from '../interfaces/api-response/company-review';
import { axiosPrivate } from '../axios';
import { handleApiError } from './error';

export const AddCompanyReview = async (
  reqBody: AddCompanyReviewRequest,
): Promise<AddCompanyReviewResponse> => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5vdmktYXp5LXdrd2siLCJlbWFpbCI6Im5vdmlhenlAdXNlci5jb20iLCJqb2JJZCI6ImdycGhjLWRnbi0xIiwiaWF0IjoxNzQyOTEyMDk2LCJleHAiOjE3NDU1MDQwOTZ9.MZwoRDHghUh28fGZyOg7cDmIKN7O83PLUl_B7Do7zb4';
    const response = await axiosPrivate(token).post(
      `/companies/${reqBody.companyId}/reviews`,
      reqBody,
    );

    return response.data as AddCompanyReviewResponse;
  } catch (error) {
    return handleApiError(error);
  }
};
