import request from 'supertest';

import App from '@/app';

const app = new App().getServer();

describe('Sample API', () => {
  it('GET /api/samples should return a list of sample data', async () => {
    const response = await request(app).get('/api/samples');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.any(Array),
      }),
    );
  });
});
