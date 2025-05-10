import { getSession } from 'next-auth/react';
import { axiosPrivate, axiosPublic } from '../axios';
import { auth } from '@/auth';

import {
  AddAssessmentQuestionRequest,
  AddAssessmentRequest,
  GetAssessmentBySlugRequest,
  GetAssessmentDiscoveryRequest,
  GetAssessmentMetadataRequest,
  GetAssessmentsRequest,
} from '../interfaces/api-request/assessment';
import {
  AddAssessmentQuestionResponse,
  AddAssessmentResponse,
  GetAssessmentBySlugResponse,
  GetAssessmentDiscoveryResponse,
  GetAssessmentMetadataResponse,
  GetAssessmentsResponse,
  GetTopAssessmentsResponse,
} from '../interfaces/api-response/assessments';
import { handleApiError } from './error';

export const getAssessments = async (
  req?: GetAssessmentsRequest,
): Promise<GetAssessmentsResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.skill) queryParams.append('skill', req?.skill.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token || '').get(
      `/assessments${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAssessmentDiscovery = async (
  req?: GetAssessmentDiscoveryRequest,
): Promise<GetAssessmentDiscoveryResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const queryParams = new URLSearchParams();

    if (req?.order) queryParams.append('order', req?.order);
    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.skill) queryParams.append('skill', req?.skill.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token || '').get(
      `/assessments/discovery${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAssessmentBySlug = async (
  req: GetAssessmentBySlugRequest,
): Promise<GetAssessmentBySlugResponse> => {
  try {
    let token;
    if (req.isOnClient) {
      const session = await getSession();
      token = session?.user?.accessToken;
    } else {
      token = req.token;
    }

    const response = await axiosPrivate(token || '').get(
      `/assessments/${req.slug}`,
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
    const session = await getSession();
    const token = session?.user?.accessToken;

    const formData = new FormData();
    formData.append('skillId', req?.skillId || '');
    if (req?.image) {
      formData.append('image', req.image);
    }
    formData.append('shortDescription', req?.shortDescription || '');

    const response = await axiosPrivate(
      token || '',
      'multipart/form-data',
    ).post('/assessments', formData);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addAssessmentQuestion = async (
  req?: AddAssessmentQuestionRequest,
): Promise<AddAssessmentQuestionResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const formData = new FormData();
    formData.append('question', req?.question || '');
    if (req?.image) {
      formData.append('image', req.image);
    }
    req?.options.forEach((option, index) => {
      formData.append(`options[${index}][text]`, option.text);
      formData.append(
        `options[${index}][isCorrect]`,
        option.isCorrect.toString(),
      );
    });

    const response = await axiosPrivate(
      token || '',
      'multipart/form-data',
    ).post(`/assessments/${req?.assessmentId}/questions`, formData);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTopAssessments =
  async (): Promise<GetTopAssessmentsResponse> => {
    try {
      const response = await axiosPublic.get('/assessments/top');

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

export const getAssessmentMetadata = async (
  req: GetAssessmentMetadataRequest,
): Promise<GetAssessmentMetadataResponse> => {
  try {
    const response = await axiosPublic.get(`/assessments/${req.slug}/metadata`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
