import request from 'supertest';
import App from '@/app';

const app = new App().getServer();

describe('GET /api/search/companies/reviews', () => {
  it('should retrieve searched company reviews', async () => {
    const response = await request(app).get(
      '/api/search/companies/reviews?q=akame',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          companies: expect.arrayContaining([
            expect.objectContaining({
              name: expect.stringMatching(/akame/i),
            }),
          ]),
        }),
      }),
    );
  });
});
