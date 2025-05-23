import { Dispatch, SetStateAction } from "react";

import { OrderType } from "@/lib/interfaces/api-request/filter";
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';


interface AssessmentDiscoveryOrderSelectProps {
  order: OrderType;
  onOrderChange: Dispatch<SetStateAction<OrderType>>;
}

const AssessmentDiscoveryOrderSelect = ({ order, onOrderChange }: AssessmentDiscoveryOrderSelectProps) => {
  return (
    <Select
      onValueChange={(value) => {
        onOrderChange(value as OrderType);
      }}
    >
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue
          placeholder={
            order === 'desc' ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <span>Total Enrollment</span>
                <ArrowDown size={16} />
              </div>
            ) : order === 'asc' ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <span>Total Enrollment</span>
                <ArrowUp size={16} />
              </div>
            ) : (
              '-- Total Enrollment --'
            )
          }
          defaultValue="desc"
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Total Enrollment</SelectLabel>
          <SelectItem value="asc">
            <div className="flex flex-row items-center justify-center gap-2">
              <span>Total Enrollment</span>
              <ArrowUp size={16} />
            </div>
          </SelectItem>
          <SelectItem value="desc">
            <div className="flex flex-row items-center justify-center gap-2">
              <span>Total Enrollment</span>
              <ArrowDown size={16} />
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AssessmentDiscoveryOrderSelect