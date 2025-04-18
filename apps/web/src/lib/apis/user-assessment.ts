import { axiosPublic } from '../axios';
import {
  AddUserAssessmentRequest,
  CalculateAssessmentResultRequest,
  GetUserAssessmentsRequest,
} from '../interfaces/api-request/user-assessment';
import {
  AddUserAssessmentResponse,
  CalculateAssessmentResultResponse,
  GetUserAssessmentsRespone,
} from '../interfaces/api-response/user-assessment';
import { handleApiError } from './error';

export const addUserAssessment = async (
  req: AddUserAssessmentRequest,
): Promise<AddUserAssessmentResponse> => {
  // TO DO: retrieve token from user session
  try {
    const response = await axiosPublic.post('/user-assessments', {
      userId: req.userId,
      assessment: req.assessment,
      score: req.score,
      status: req.status,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const calculateAssessmentResult = async (
  req: CalculateAssessmentResultRequest,
): Promise<CalculateAssessmentResultResponse> => {
  // TO DO: retrieve token from user session
  try {
    const response = await axiosPublic.post(
      `/user-assessments/${req.userAssessmentId}/result`,
      req,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserAssessments = async (
  req?: GetUserAssessmentsRequest,
): Promise<GetUserAssessmentsRespone> => {
  // TO DO: retrieve token from user session
  try {
    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.skill) queryParams.append('skill', req?.skill.toString());

    const query = queryParams.toString();
    const response = await axiosPublic.get(
      `/user-assessments${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
