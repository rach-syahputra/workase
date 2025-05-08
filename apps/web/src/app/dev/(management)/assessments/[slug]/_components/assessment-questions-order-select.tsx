'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';

import { OrderType } from '@/lib/interfaces/api-request/filter';
import { useBrowseAssessmentQuestionContext } from '@/context/browse-assessment-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';

const AssessmentQuestionsOrderSelect = () => {
  const { setOrder } = useBrowseAssessmentQuestionContext();

  return (
    <Select
      onValueChange={(value) => {
        setOrder(value as OrderType);
      }}
    >
      <SelectTrigger className="w-full md:w-[240px]">
        <SelectValue
          placeholder={
            <div className="flex items-center gap-2">
              Creation Date <ArrowDown size={16} />
            </div>
          }
          defaultValue="desc"
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Creation Date</SelectLabel>
          <SelectItem value="asc">
            <div className="flex items-center gap-2">
              Creation Date <ArrowUp size={16} />
            </div>
          </SelectItem>
          <SelectItem value="desc">
            <div className="flex items-center gap-2">
              Creation Date <ArrowDown size={16} />
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AssessmentQuestionsOrderSelect;
