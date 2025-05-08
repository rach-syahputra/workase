import { getSession } from 'next-auth/react';

import { axiosPrivate, axiosPublic } from '../axios';
import {
  AddCvRequest,
  GenerateCvSummaryRequest,
  GetCvBySlugRequest,
  UpdateCvRequest,
} from '../interfaces/api-request/cv';
import {
  AddCvResponse,
  GenerateCvSummaryResponse,
  GetCvBySlugResponse,
  UpdateCvResponse,
} from '../interfaces/api-response/cv';
import { getCvSummaryGenerationPrompt } from '../cv-summary-generation';
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

export const addCv = async (req: AddCvRequest): Promise<AddCvResponse> => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  try {
    const response = await axiosPrivate(token || '').post('/cvs', {
      data: req.data,
    });

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

const generateCvSummaryFromApiRouter = async ({
  userInformation,
  apiKey,
}: GenerateCvSummaryRequest) => {
  const prompt = getCvSummaryGenerationPrompt(userInformation);

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();

  return data;
};

export const generateCvSummary = async ({
  userInformation,
  apiKey,
}: GenerateCvSummaryRequest): Promise<
  GenerateCvSummaryResponse | undefined
> => {
  try {
    const response = await generateCvSummaryFromApiRouter({
      userInformation,
      apiKey,
    });

    // Return error if the daily limit reached
    if (response?.error?.code === 429) {
      return {
        success: false,
        code: 'ERR_TOO_MANY_REQUESTS',
        error: {
          message: `You've reached daily limit.`,
        },
      };
    }

    const summary = response.choices[0].message.content;

    if (!response || !summary) {
      return {
        success: false,
        error: {
          message: 'Failed to generate a cv summary',
        },
      };
    }

    return {
      success: true,
      message: 'CV Summary generated successfully.',
      data: {
        summary,
      },
    };
  } catch (error) {
    handleApiError(error);
  }
};
