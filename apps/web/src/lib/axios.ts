import axios from 'axios';
import { API_BASE_URL } from './constants/constants';

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = (token: string, contentType?: string) =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType || 'application/json',
    },
  });
