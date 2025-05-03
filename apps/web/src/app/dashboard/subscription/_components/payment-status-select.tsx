'use client';

import { Dispatch, SetStateAction } from 'react';

import { GetSubscriptionStatusType } from '@/lib/interfaces/api-request/subscription';
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

interface PaymentStatusSelectProps {
  setStatus: Dispatch<SetStateAction<GetSubscriptionStatusType[]>>;
}

const PaymentStatusSelect = ({ setStatus }: PaymentStatusSelectProps) => {
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
    <Select
      onValueChange={(value) => {
        setStatus([value] as GetSubscriptionStatusType[]);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue
          placeholder="Select Status"
          defaultValue="ALL"
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Payment Status</SelectLabel>
          {STATUS_ITEMS.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PaymentStatusSelect;
