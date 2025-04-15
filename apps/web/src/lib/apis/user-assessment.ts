import { axiosPublic } from '../axios';
import {
  AddUserAssessmentRequest,
  CalculateAssessmentResultRequest,
} from '../interfaces/api-request/user-assessment';
import {
  AddUserAssessmentResponse,
  CalculateAssessmentResultResponse,
} from '../interfaces/api-response/user-assessment';
import { handleApiError } from './error';

export const addUserAssessment = async (
  req: AddUserAssessmentRequest,
): Promise<AddUserAssessmentResponse> => {
  // TO DO: retrieve token from user session
  try {
    const response = await axiosPublic.post('/user-assessments', {
      userId: req.userId,
      assessmentId: req.assessmentId,
      score: req.score,
      status: req.status,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const CalculateAssessmentResult = async (
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
