'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

import { IAssessment } from '@/lib/interfaces/assessment';
import { getAssessmentDiscovery } from '@/lib/apis/assessments';
import { OrderType } from '@/lib/interfaces/api-request/filter';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Card } from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import AppPagination from '@/components/ui/pagination';
import UserDashboardHeader from '@/components/user-dashboard/user-dashboard-header';
import AssessmentCardSkeleton from './assessment-card-skeleton';
import AssessmentCard from './assessment-card';

interface OrderSelectProps {
  order: OrderType;
  onOrderChange: Dispatch<SetStateAction<OrderType>>;
}

const AssessmentDiscovery = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [order, setOrder] = useState<OrderType>('desc');
  const [searchSkill, setSearchSkill] = useState<string>('');
  const [debouncedSearchSkill, setDebouncedSearchSkill] = useState<string>('');
  const [assessments, setAssessments] = useState<IAssessment[]>([]);

  const fetchGetAssessmentDiscovery = useCallback(async () => {
    setIsLoading(true);

    const response = await getAssessmentDiscovery({
      limit,
      page,
      order,
      skill: debouncedSearchSkill,
    });

    if (response.success) {
      setAssessments(
        response.data?.assessments.map((assessment) => assessment) || [],
      );
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setPage(page || 1);
    }

    setIsLoading(false);
  }, [page, limit, order, debouncedSearchSkill]);

  useEffect(() => {
    fetchGetAssessmentDiscovery();
  }, [fetchGetAssessmentDiscovery]);

  useEffect(() => {
    const handleDebouncedSearchSkill = setTimeout(() => {
      setPage(1);
      setDebouncedSearchSkill(searchSkill);
    }, 500);

    return () => clearTimeout(handleDebouncedSearchSkill);
  }, [searchSkill]);

  return (
    <Card className="flex w-full flex-col items-start justify-center gap-6 max-md:border-none max-md:p-0 max-md:shadow-none md:p-5">
      <UserDashboardHeader
        title="Assessment Discovery"
        description="Explore a variety of skill-based assessments and boost your chances of getting hired."
      />
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Input
            type="text"
            placeholder="Search assessments..."
            onChange={(e) => setSearchSkill(e.target.value)}
            value={searchSkill}
            className="w-full md:w-1/2"
          />
          <OrderSelect order={order} onOrderChange={setOrder} />
        </div>

        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <AssessmentCardSkeleton />
              <AssessmentCardSkeleton />
              <AssessmentCardSkeleton />
            </>
          ) : assessments?.length ? (
            <>
              {assessments.map((assessment, index) => (
                <AssessmentCard key={index} assessment={assessment} />
              ))}
              {totalPages > 1 && (
                <AppPagination
                  page={page}
                  disabled={isLoading}
                  onPageChange={setPage}
                  totalPages={totalPages}
                  className="mt-2"
                />
              )}
            </>
          ) : (
            <div className="text-primary-gray col-span-1 flex h-60 w-full items-center justify-center md:col-span-2 lg:col-span-3">
              No available assessments.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const OrderSelect = ({ order, onOrderChange }: OrderSelectProps) => {
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

export default AssessmentDiscovery;
