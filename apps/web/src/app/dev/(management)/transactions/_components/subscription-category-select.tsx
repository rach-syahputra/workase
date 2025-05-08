'use client';

import { GetSubscriptionCategoryType } from '@/lib/interfaces/api-request/subscription';
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

const SubscriptionCategorySelect = () => {
  const { setCategory } = useDeveloperTransactionContext();

  return (
    <Select
      onValueChange={(value) => {
        setCategory(value as GetSubscriptionCategoryType);
      }}
    >
      <SelectTrigger className="w-full md:w-[240px]">
        <SelectValue
          placeholder="Select Category"
          defaultValue="ALL"
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="ALL">
            Category: <strong>All</strong>
          </SelectItem>
          <SelectItem value="STANDARD">
            Category: <strong>Standard</strong>
          </SelectItem>
          <SelectItem value="PROFESSIONAL">
            Category: <strong>Professional</strong>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubscriptionCategorySelect;
