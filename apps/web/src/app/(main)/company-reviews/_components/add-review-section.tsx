'use client';

import Link from 'next/link';

import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';

interface AddReviewSectionProps {
  className?: string;
}

const AddReviewSection = ({ className }: AddReviewSectionProps) => {
  const { userCurrentCompanies } = useCompaniesReviewsContext();

  return (
    <Card className={className}>
      {userCurrentCompanies && userCurrentCompanies?.length > 0 ? (
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-2 p-4">
            <span className="text-sm">Companies you are working at:</span>
            <ul className="flex flex-col gap-0.5">
              {userCurrentCompanies?.map((userCurrentCompany, index) => (
                <li
                  key={index}
                  className="hover:text-primary-blue select-none text-sm font-medium hover:underline"
                >
                  <Link
                    href={userCurrentCompany.slug}
                    aria-label="Company detail page"
                  >
                    {userCurrentCompany.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 p-4">
            <p className="text-sm">
              Share your professional experience to guide job seekers in their
              decisions.
            </p>
            <Button asChild>
              <Link
                href="/company-reviews/new"
                aria-label="Add company review page"
              >
                Add Review
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4">
          <p className="text-sm">
            Join or work at a company available on Workase to share your
            experience.{' '}
            <Link
              href="/all-jobs"
              aria-label="All jobs page"
              className="hover:text-primary-blue select-none text-sm underline"
            >
              Explore jobs
            </Link>
          </p>
        </div>
      )}
    </Card>
  );
};

export default AddReviewSection;
