'use client';
import * as React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn-ui/button';
import { Calendar } from '@/components/shadcn-ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
export default function FilterBaseOnTime({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2026, 0, 20), 20),
  });
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(`desc`);

  const handleDateChange = (newDate: DateRange) => {
    setDate(newDate);
    if (newDate?.from) {
      setDateFilter('custom');
      applyFilters('custom', sortOrder, newDate);
    }
  };
  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    if (value !== 'custom') {
      setDate(undefined);
    }
    applyFilters(value, sortOrder, value === 'custom' ? date : undefined);
  };
  const hanlerSortChange = (value: string) => {
    const newSortOrder = value as 'desc' | 'asc';
    setSortOrder(newSortOrder);
    applyFilters(dateFilter || null, newSortOrder, date);
  };
  const applyFilters = async (
    newDateFilter: string | null,
    newSortOrder: 'desc' | 'asc',
    newDate?: DateRange | undefined,
  ) => {
    const title = searchParams.get('title') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const page = 1;
    const params = new URLSearchParams();
    if (page) params.set('page', page.toString());
    if (title) params.set('title', title);
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    if (newDateFilter) params.set('dateFilter', newDateFilter);
    if (newSortOrder !== 'desc') params.set('sortOrder', newSortOrder);
    if (date?.from) params.set('startDate', newDate?.from?.toString() || '');
    if (date?.to) params.set('endDate', newDate?.to?.toString() || '');
    router.replace(`/all-jobs?${params.toString()}`);
  };
  return (
    <div className="w-full max-w-[835px] flex-col items-center justify-center gap-1 rounded-md px-[5px] md:flex md:flex-row md:items-center md:justify-around md:px-[0px]">
      <div className="w-full">
        <div className={cn('flex w-full justify-between', className)}>
          <Popover>
            <PopoverTrigger asChild className="w-full">
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-full justify-between border border-black text-left font-normal outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
                  !date && 'text-muted-foreground',
                )}
              >
                {date?.from ? (
                  date.to ? (
                    <div className="ml-[-4.5px]">
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </div>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span className="ml-[-4.5px]">Pick a date</span>
                )}
                <CalendarIcon className="mr-[-4.5px]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newDate) => newDate && handleDateChange(newDate)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="w-full py-1">
        <Select
          value={dateFilter || undefined}
          onValueChange={handleDateFilterChange}
        >
          <SelectTrigger className="w-full border border-black outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
            <SelectValue placeholder="Date Posted" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="custom">Custom Range</SelectItem>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="7days">7 days</SelectItem>
              <SelectItem value="1month">1 month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Select value={sortOrder} onValueChange={hanlerSortChange}>
          <SelectTrigger className="w-full border border-black outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
