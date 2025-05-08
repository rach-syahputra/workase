'use client';

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

const PaymentStatusSelect = () => {
  const { setStatus } = useDeveloperTransactionContext();

  const STATUS_ITEMS = [
    {
      label: (
        <>
          Status: <strong>All</strong>
        </>
      ),
      value: 'ALL',
    },
    {
      label: (
        <>
          Status: <strong>Confirmed</strong>
        </>
      ),
      value: 'CONFIRMED',
    },
    {
      label: (
        <>
          Status: <strong>Pending</strong>
        </>
      ),
      value: 'PENDING',
    },
    {
      label: (
        <>
          Status: <strong>Rejected</strong>
        </>
      ),
      value: 'REJECTED',
    },
  ];

  return (
    <Select
      onValueChange={(value) => {
        setStatus([value] as GetSubscriptionStatusType[]);
      }}
    >
      <SelectTrigger className="w-full md:w-[240px]">
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
