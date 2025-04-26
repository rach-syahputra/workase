import request from 'supertest';
import App from '@/app';

import { getDeveloperAuthToken } from '../helpers/auth.helper';
import { assessmentId } from '../helpers/assessment.helper';

const app = new App().getServer();

describe('GET /api/assessments/:assessmentId/questions', () => {
  let token: string;

  beforeAll(async () => {
    token = await getDeveloperAuthToken({
      email: 'nadiyariska@gmail.com',
      password: '77772345',
    });
  });

  it('should retrieve assessment questions', async () => {
    const response = await request(app)
      .get(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', token)
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          assessmentQuestions: expect.arrayContaining([
            expect.objectContaining({
              options: expect.any(Array),
            }),
          ]),
        }),
      }),
    );
  });
});
