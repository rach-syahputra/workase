import request from 'supertest';
import App from '@/app';

const app = new App()['app'];

interface Credentials {
  email: string;
  password: string;
}

export const getAuthToken = async (
  credentials?: Credentials,
): Promise<string> => {
  const requestBody = {
    email: credentials?.email || 'noviazy@user.com',
    password: credentials?.password || '77772345',
  };

  const response = await request(app)
    .post('/api/samples/auth')
    .send(requestBody);

  return `Bearer ${response.body.data.accessToken}`;
};
