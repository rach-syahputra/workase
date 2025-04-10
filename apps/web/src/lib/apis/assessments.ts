import { axiosPrivate } from '../axios';

import {
  AddAssessmentQuestionRequest,
  AddAssessmentRequest,
  GetAssessmentByIdRequest,
  GetAssessmentQuestionsRequest,
  GetAssessmentsRequest,
  GetAvailableSkillsRequest,
} from '../interfaces/api-request/assessment';
import {
  AddAssessmentQuestionResponse,
  AddAssessmentResponse,
  GetAssessmentByIdResponse,
  GetAssessmentQuestionsResponse,
  GetAssessmentsResponse,
  GetAvailableSkillsResponse,
} from '../interfaces/api-response/assessments';
import { handleApiError } from './error';

export const getAssessments = async (
  req?: GetAssessmentsRequest,
): Promise<GetAssessmentsResponse> => {
  try {
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';
    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.skill) queryParams.append('skill', req?.skill.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token).get(
      `/assessments${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAssessmentById = async (
  req?: GetAssessmentByIdRequest,
): Promise<GetAssessmentByIdResponse> => {
  try {
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';

    const response = await axiosPrivate(token).get(`/assessments/${req?.id}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAvailableSkills = async (
  req?: GetAvailableSkillsRequest,
): Promise<GetAvailableSkillsResponse> => {
  try {
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';
    const queryParams = new URLSearchParams();

    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.title) queryParams.append('title', req?.title.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token).get(
      `/assessments/skills/available${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addAssessment = async (
  req?: AddAssessmentRequest,
): Promise<AddAssessmentResponse> => {
  try {
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';

    const formData = new FormData();
    formData.append('skillId', req?.skillId || '');
    if (req?.image) {
      formData.append('image', req.image);
    }
    formData.append('shortDescription', req?.shortDescription || '');

    const response = await axiosPrivate(token, 'multipart/form-data').post(
      '/assessments',
      formData,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAssessmentQuestions = async (
  req?: GetAssessmentQuestionsRequest,
): Promise<GetAssessmentQuestionsResponse> => {
  try {
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';
    const queryParams = new URLSearchParams();

    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.question) queryParams.append('question', req?.question.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token).get(
      `/assessments/${req?.assessmentId}/questions${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addAssessmentQuestion = async (
  req?: AddAssessmentQuestionRequest,
): Promise<AddAssessmentQuestionResponse> => {
  try {
    // TO DO: retrieve token from session
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4NGRmMjdmLWNmY2MtNGI1OS1iYmNhLWQwNjYwNTAxNWIwNSIsImVtYWlsIjoibmFkaXlhcmlza2FAZ21haWwuY29tIiwicm9sZSI6IkRFVkVMT1BFUiIsImlhdCI6MTc0MzcwODU1OCwiZXhwIjoxNzQ2MzAwNTU4fQ.Uy5ucffg4bE5QqzVLNvd8AQMPF4bG2ueUYR7V-6DQTs';

    const response = await axiosPrivate(token).post(
      `/assessments/${req?.assessmentId}/questions`,
      {
        question: req?.question,
        options: req?.options,
      },
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
