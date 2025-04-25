import { ChartNoAxesCombined, CreditCard, NotepadText } from 'lucide-react';

export const DEVELOPER_SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    url: '/dev',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Assessment',
    url: '/dev/assessments',
    icon: NotepadText,
  },
  {
    title: 'Transaction',
    url: '/dev/transactions',
    icon: CreditCard,
  },
];
