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
<<<<<<< HEAD
          reviews: expect.arrayContaining([expect.any(Object)]),
=======
          companiesReviews: expect.arrayContaining([expect.any(Object)]),
>>>>>>> 283fb81 (feat(api): add Get Companies Reviews API)
          pagination: expect.any(Object),
        }),
      }),
    );
  });

  it(`should retrieve companies' reviews with names containing 'akame'`, async () => {
<<<<<<< HEAD
    const response = await request(app).get(
      '/api/companies/reviews?jobTitle=graphic',
    );
=======
    const response = await request(app).get('/api/companies/reviews?q=akame');
>>>>>>> 283fb81 (feat(api): add Get Companies Reviews API)

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
<<<<<<< HEAD
          reviews: expect.arrayContaining([
            expect.objectContaining({
              jobTitle: expect.stringMatching(/graphic/i),
=======
          companiesReviews: expect.arrayContaining([
            expect.objectContaining({
              companyName: expect.stringMatching(/akame/i),
>>>>>>> 283fb81 (feat(api): add Get Companies Reviews API)
            }),
          ]),
          pagination: expect.any(Object),
        }),
      }),
    );
  });
});
