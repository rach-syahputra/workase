import request from 'supertest';
import App from '@/app';

import { AddCompanyReviewRequestTest } from '@/interfaces/company-review.interface';
import { deleteCompanyReview, getAuthToken } from '../utils';

const app = new App().getServer();

describe('POST /api/companies/:companyId/reviews', () => {
  let token: string;
  let requestBody: AddCompanyReviewRequestTest | undefined = undefined;

  beforeAll(async () => {
    token = await getAuthToken({
      email: 'noviazy@user.com',
      password: '77772345',
    });

    requestBody = {
      companyId: 'akame-cmp',
      title: 'Review Test',
      salaryEstimate: 1500,
      content: 'Amazing experience working here.',
      rating: {
        workCulture: 5,
        workLifeBalance: 4,
        facilities: 4,
        careerGrowth: 5,
      },
    };
  });

  it('should create a company review', async () => {
    const response = await request(app)
      .post('/api/companies/akame-cmp/reviews')
      .set('Authorization', token)
      .send(requestBody)
      .expect(201);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          companyReview: expect.any(Object),
        }),
      }),
    );

    const companyReviewId = response.body.data.companyReview.id;
    await deleteCompanyReview(companyReviewId);
  });

  it('should not create a company review if required fields are missing', async () => {
    const { title, salaryEstimate, ...updatedRequestBody } =
      requestBody as AddCompanyReviewRequestTest;
    const response = await request(app)
      .post('/api/companies/akame-cmp/reviews')
      .set('Authorization', token)
      .send(updatedRequestBody);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should not create a company review if authorization header is missing', async () => {
    const response = await request(app)
      .post('/api/companies/akame-cmp/reviews')
      .send(requestBody);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });

  it('should not create a company review if user does not belong to the company', async () => {
    token = await getAuthToken({
      email: 'unauthorized.test@user.com',
      password: '77772345',
    });

    const response = await request(app)
      .post('/api/companies/akame-cmp/reviews')
      .set('Authorization', token)
      .send(requestBody);

    expect(response.status).toBe(403);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
      }),
    );
  });
});
