'use client';

import { Dispatch, SetStateAction } from 'react';

import { GetSubscriptionCategoryType } from '@/lib/interfaces/api-request/subscription';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';

interface OverviewCategorySelectProps {
  setCategory: Dispatch<SetStateAction<GetSubscriptionCategoryType>>;
}

const OverviewCategorySelect = ({
  setCategory,
}: OverviewCategorySelectProps) => {
  return (
    <Select
      onValueChange={(value) => {
        setCategory(value as GetSubscriptionCategoryType);
      }}
    >
      <SelectTrigger className="w-[280px]">
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

export default OverviewCategorySelect;
