import request from 'supertest';
import App from '@/app';

import { AddAssessmentQuestionBodyRequest } from '@/interfaces/assessment.interface';
import { getDeveloperAuthToken } from '../helpers/auth.helper';
import {
  deleteAssessmentQuestion,
  getAssessmentQuestionById,
} from '../helpers/assessment.helper';

const app = new App().getServer();

describe('POST /api/assessments/:assessmentId/questions', () => {
  let token: string;
  let assessmentId: string;
  let requestBody: AddAssessmentQuestionBodyRequest | undefined = undefined;

  beforeAll(async () => {
    token = await getDeveloperAuthToken({
      email: 'nadiyariska@gmail.com',
      password: '77772345',
    });

    assessmentId = 'a52d7242-84eb-4067-a36e-f6985757a5a2';

    requestBody = {
      question: 'This is a question test.',
      options: [
        {
          text: 'Option test 1',
          isCorrect: 0,
        },
        {
          text: 'Option test 2',
          isCorrect: 0,
        },
        {
          text: 'Option test 3',
          isCorrect: 0,
        },
        {
          text: 'Option test 4',
          isCorrect: 1,
        },
      ],
    };
  });

  it('should create an assessment question', async () => {
    const response = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', token)
      .send(requestBody)
      .expect(201);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          assessmentQuestion: expect.objectContaining({
            options: expect.any(Array),
          }),
        }),
      }),
    );

    // Delete the assessment question
    const assessmentQuestionId = response.body.data.assessmentQuestion.id;
    await deleteAssessmentQuestion(assessmentQuestionId);

    // Ensure assessment question has been deleted
    const assessmentQuestion =
      await getAssessmentQuestionById(assessmentQuestionId);
    expect(assessmentQuestion).toBeFalsy();
  });

  it('should not create an assessment question due to multiple correct options', async () => {
    requestBody = {
      question: 'This is a question test.',
      options: [
        {
          text: 'Option test 1',
          isCorrect: 0,
        },
        {
          text: 'Option test 2',
          isCorrect: 0,
        },
        {
          text: 'Option test 3',
          isCorrect: 1,
        },
        {
          text: 'Option test 4',
          isCorrect: 1,
        },
      ],
    };

    const response = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', token)
      .send(requestBody)
      .expect(400);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          message: expect.any(String),
        }),
      }),
    );
  });
});

export default {};
