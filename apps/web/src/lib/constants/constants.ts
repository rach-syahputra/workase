export const CLIENT_BASE_URL = 'https://workase.vercel.app';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const OPEN_ROUTER_API_KEYS = [
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_2,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_3,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_4,
  process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY_5,
];
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const BOTTOM_NAVIGATION_HREFS = [
  '/company-reviews',
  '/company-reviews/saved',
  '/company-reviews/new',
  '/dashboard/applied-jobs',
  '/dashboard/saved-jobs',
  '/dashboard/assessments',
  '/dashboard/assessments?tab=discovery',
  '/dashboard/assessments?tab=history',
  '/dashboard/subscription',
  '/dashboard/subscription?tab=overview',
  '/dashboard/subscription?tab=billing',
  '/w',
];
