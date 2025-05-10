export const CLIENT_BASE_URL = 'https://workase.vercel.app/';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const OPEN_ROUTER_API_KEYS = [
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_2,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_3,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_4,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_5,
];
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
