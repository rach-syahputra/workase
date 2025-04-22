import { axiosPublic } from '../axios';

const loginUserWithEmail = async (email: string, password: string) => {
  try {
    const response = await axiosPublic.post('/auth/login/user', {
      email: email,
      password: password,
      authProvider: 'EMAIL',
    });
    const user = response.data.data;
    user.type = 'user';
    return user;
  } catch (error) {
    return null;
  }
};

const loginCompanyWithEmail = async (email: string, password: string) => {
  try {
    const response = await axiosPublic.post('/auth/login/company', {
      email: email,
      password: password,
      authProvider: 'EMAIL',
    });
    const user = response.data.data;
    user.type = 'company';
    return user;
  } catch (error) {
    return null;
  }
};

const loginUserWithGoogle = async (email: string) => {
  const response = await axiosPublic.post('/auth/login/user', {
    email: email,
    authProvider: 'GOOGLE',
  });
  return response;
};

const registerUserWithGoogle = async (email: string) => {
  axiosPublic.post('/auth/register/user', {
    email: email,
    authProvider: 'GOOGLE',
  });
};

const loginCompanyWithGoogle = async (email: string) => {
  const response = axiosPublic.post('/auth/login/company', {
    email: email,
    authProvider: 'GOOGLE',
  });
  return response;
};

const registerCompanyWithGoogle = async (email: string) => {
  await axiosPublic.post('/auth/register/company', {
    email: email,
    authProvider: 'GOOGLE',
  });
};

const refreshUserToken = async (refreshToken: string) => {
  const newToken = await axiosPublic.post('/users/token', undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return newToken.data.data;
};

const refreshCompanyToken = async (refreshToken: string) => {
  const newToken = await axiosPublic.post('/companies/token', undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return newToken.data.data;
};
export {
  loginUserWithEmail,
  loginCompanyWithEmail,
  loginUserWithGoogle,
  registerUserWithGoogle,
  loginCompanyWithGoogle,
  registerCompanyWithGoogle,
  refreshUserToken,
  refreshCompanyToken,
};
