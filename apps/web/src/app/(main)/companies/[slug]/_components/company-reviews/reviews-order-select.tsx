'use client';

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
  const { firstRenderRef, renderWithQ, order, setOrder } =
    useCompanyReviewsContext();

  const handleOrderChange = (value: OrderType) => {
    firstRenderRef.current = false;
    renderWithQ.current = true;
    setOrder(value);
  };

  const ORDER_ITEMS = [
    {
      label: (
        <>
          Date: <strong>Newest</strong>
        </>
      ),
      value: 'desc',
    },
    {
      label: (
        <>
          Date: <strong>Oldest</strong>
        </>
      ),
      value: 'asc',
    },
  ];

  return (
    <Select
      onValueChange={(value) => {
        handleOrderChange(value as OrderType);
      }}
    >
      <SelectTrigger className="w-full md:w-[280px]">
        <SelectValue
          placeholder={
            order === 'asc' ? (
              <>
                Date: <strong>Oldest</strong>
              </>
            ) : (
              <>
                Date: <strong>Newest</strong>
              </>
            )
          }
          defaultValue="desc"
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Reviews Date</SelectLabel>
          {ORDER_ITEMS.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ReviewsOrderSelect;
