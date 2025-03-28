import request from 'supertest';
import App from '@/app';

const app = new App().getServer();

describe('GET /api/companies/:companyId/reviews', () => {
  it('should retrieve company reviews', async () => {
    const response = await request(app).get('/api/companies/akame-cmp/reviews');

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

  it('should retrieve limited company reviews when using a limit query', async () => {
    const limit = 5;
    const response = await request(app).get(
      `/api/companies/akame-cmp/reviews?limit=${limit}`,
    );

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
    expect(response.body.data.reviews).toHaveLength(limit);
  });
});
