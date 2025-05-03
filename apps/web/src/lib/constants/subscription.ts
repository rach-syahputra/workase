import {
  ISubscriptionCard,
  ISubscriptionStatCard,
} from '../interfaces/subscription';

export const SUBSCRIPTION_CARDS: ISubscriptionCard[] = [
  {
    id: 'STANDARD',
    category: 'Standard',
    price: 1.5,
    benefits: ['CV Generator', '2x Assessment Enrollment'],
  },
  {
    id: 'PROFESSIONAL',
    category: 'Professional',
    price: 5.0,
    benefits: [
      'CV Generator',
      'Unlimited Assessment Enrollment',
      'Priority Review on Job Applications',
    ],
  },
];

export const SUBSCRIPTION_STATS: ISubscriptionStatCard[] = [
  {
    amount: 167,
    label: 'Subscribers',
  },
  {
    amount: 101,
    label: 'Certificates Generated',
  },
  {
    amount: 320,
    label: 'Assessments Enrolled',
  },
  {
    amount: 80,
    label: 'Users Hired',
  },
];
