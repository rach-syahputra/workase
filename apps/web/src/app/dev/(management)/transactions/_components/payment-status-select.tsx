'use client';

import { ChevronDown } from 'lucide-react';

import { SubscriptionPaymentStatusType } from '@/lib/interfaces/subscription';
import { useDeveloperTransactionContext } from '@/context/developer-transaction-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';

const PaymentStatusSelect = () => {
  const { handleSelectStatus } = useDeveloperTransactionContext();

  const STATUS_ITEMS = [
    {
      label: 'All',
      value: 'ALL',
    },
    {
      label: 'Confirmed',
      value: 'CONFIRMED',
    },
    {
      label: 'Pending',
      value: 'PENDING',
    },
    {
      label: 'Rejected',
      value: 'REJECTED',
    },
  ];

  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Status" defaultValue="ALL" />
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Payment Status</SelectLabel>
          {STATUS_ITEMS.map((item, index) => (
            <SelectItem
              onClick={() =>
                handleSelectStatus(
                  item.value as SubscriptionPaymentStatusType | 'ALL',
                )
              }
              key={index}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PaymentStatusSelect;
