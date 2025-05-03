import request from 'supertest';
import App from '@/app';

const app = new App().getServer();

describe('GET /api/companies/reviews', () => {
  it(`should retrieve companies' reviews`, async () => {
    const response = await request(app).get('/api/companies/reviews');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          reviews: expect.arrayContaining([expect.any(Object)]),
          pagination: expect.any(Object),
        }),
      }),
    );
  });

  it(`should retrieve companies' reviews with names containing 'akame'`, async () => {
    const response = await request(app).get(
      '/api/companies/reviews?jobTitle=graphic',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          reviews: expect.arrayContaining([
            expect.objectContaining({
              jobTitle: expect.stringMatching(/graphic/i),
            }),
          ]),
          pagination: expect.any(Object),
        }),
      }),
    );
  });
});
