import { getSession } from 'next-auth/react';

import { axiosPrivate } from '../axios';
import { getAssessmentQuestionGenerationPrompt } from '../assessment-question-generation';
import {
  DeleteAssessmentQuestionRequest,
  GetAssessmentQuestionsRequest,
} from '../interfaces/api-request/assessment';
import { GenerateAssessmentQuestionRequest } from '../interfaces/api-request/assessment-question';
import { GenerateAssessmentQuestionResponse } from '../interfaces/api-response/assessment-question';
import {
  DeleteAssessmentQuestionResponse,
  GetAssessmentQuestionsResponse,
} from '../interfaces/api-response/assessments';
import { IGeneratedQuestion } from '../interfaces/assessment-question';
import { handleApiError } from './error';

export const getAssessmentQuestions = async (
  req?: GetAssessmentQuestionsRequest,
): Promise<GetAssessmentQuestionsResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const queryParams = new URLSearchParams();

    if (req?.limit) queryParams.append('limit', req?.limit.toString());
    if (req?.page) queryParams.append('page', req?.page.toString());
    if (req?.question) queryParams.append('question', req?.question.toString());
    if (req?.randomize)
      queryParams.append('randomize', req?.randomize.toString());

    const query = queryParams.toString();
    const response = await axiosPrivate(token || '').get(
      `/assessments/${req?.slug}/questions${query ? `?${query}` : ''}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteAssessmentQuestion = async (
  req: DeleteAssessmentQuestionRequest,
): Promise<DeleteAssessmentQuestionResponse> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const response = await axiosPrivate(token || '').delete(
      `/assessments/${req?.assessmentId}/questions/${req.assessmentQuestionId}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const generateAssessmentQuestionFromApiRouter = async ({
  skill,
  existingQuestions,
  apiKey,
}: GenerateAssessmentQuestionRequest) => {
  const prompt = getAssessmentQuestionGenerationPrompt(
    skill,
    existingQuestions,
  );

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
        response_format: {
          type: 'json_object',
          schema: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              correctOption: { type: 'string' },
              incorrectOptions: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      }),
    },
  );

  const data = await response.json();

  return data;
};

export const generateAssessmentQuestion = async ({
  skill,
  existingQuestions,
  apiKey,
}: GenerateAssessmentQuestionRequest): Promise<
  GenerateAssessmentQuestionResponse | undefined
> => {
  try {
    const response = await generateAssessmentQuestionFromApiRouter({
      skill,
      existingQuestions,
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

    // Convert the generated content into json object
    const generatedQuestion: IGeneratedQuestion = JSON.parse(
      response.choices[0].message.content,
    );

    if (!response || !generatedQuestion) {
      return {
        success: false,
        error: {
          message: 'Failed to generate a question',
        },
      };
    }

    return {
      success: true,
      message: 'Question generated successfully.',
      data: {
        content: generatedQuestion,
      },
    };
  } catch (error) {
    handleApiError(error);
  }
};
