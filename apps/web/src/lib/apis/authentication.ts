import { API_BASE_URL } from '../constants/constants';

const loginUserWithEmail = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        authProvider: 'EMAIL',
      }),
    });
    const data = await response.json();
    const user = data.data;
    user.type = 'user';
    return user;
  } catch (error) {
    return null;
  }
};

const loginCompanyWithEmail = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        authProvider: 'EMAIL',
      }),
    });
    const data = await response.json();
    const user = data.data;
    user.type = 'company';
    return user;
  } catch (error) {
    return null;
  }
};

const loginUserWithGoogle = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        authProvider: 'GOOGLE',
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const user = await response.json();
    return user;
  } catch (e) {
    return null;
  }
};

const registerUserWithGoogle = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        authProvider: 'GOOGLE',
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const user = await loginUserWithGoogle(email as string);
    return user;
  } catch (e) {
    throw new Error('Login as user with Google failed');
  }
};

const loginCompanyWithGoogle = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        authProvider: 'GOOGLE',
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const user = await response.json();
    return user;
  } catch (e) {
    return null;
  }
};

const registerCompanyWithGoogle = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        authProvider: 'GOOGLE',
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
    const user = await loginCompanyWithGoogle(email as string);
    return user;
  } catch (e) {
    throw new Error('Login as company with Google failed');
  }
};

const refreshUserToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const newToken = data.data;
    return newToken;
  } catch (e) {
    throw new Error('Session expired');
  }
};

const refreshCompanyToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/companies/token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const newToken = data.data;
    return newToken;
  } catch (e) {
    throw new Error('Session expired');
  }
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
