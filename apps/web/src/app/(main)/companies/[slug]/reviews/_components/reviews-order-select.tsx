'use client';

import { useRouter } from 'next/navigation';

import { OrderType } from '@/lib/interfaces/api-request/filter';
import { useCompanyReviewsContext } from '@/context/company-reviews-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';

const ReviewsOrderSelect = () => {
  const router = useRouter();
  const { firstRenderRef, renderWithQ, order, slug } =
    useCompanyReviewsContext();

  const handleOrderChange = (value: OrderType) => {
    firstRenderRef.current = false;
    renderWithQ.current = true;
    router.push(`/companies/${slug}/reviews?order=${value}`);
  };

  return (
    <Select
      onValueChange={(value) => {
        handleOrderChange(value as OrderType);
      }}
    >
      <SelectTrigger className="w-full md:w-[280px]">
        <SelectValue
          placeholder={order === 'desc' ? 'Newest' : 'Oldest'}
          defaultValue="desc"
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Reviews Date</SelectLabel>
          <SelectItem value="desc">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ReviewsOrderSelect;
