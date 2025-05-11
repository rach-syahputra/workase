'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Minus } from 'lucide-react';

import { useUserDetailContext } from '@/context/user-detail-context';
import { Button } from '@/components/shadcn-ui/button';

interface CompanyItemProps {
  title: string;
  value: string;
}

const Company = () => {
  const { user } = useUserDetailContext();
  const company = user?.company;

  return company ? (
    <div className="flex flex-col gap-6 p-5">
      <div className="flex flex-col">
        <h1 className="heading-3">Company</h1>
        <p className="text-primary-gray text-sm">Company the user works for</p>
      </div>

      <div className="flex flex-col items-start justify-start gap-8 lg:flex-row lg:justify-between">
        {company?.logoUrl ? (
          <Image
            src={company.logoUrl}
            alt="Profile Photo"
            width={200}
            height={200}
            className="aspect-square w-28 rounded-full bg-gray-200"
          />
        ) : (
          <div className="aspect-square w-28 rounded-full bg-gray-200"></div>
        )}
        <div className="flex w-full flex-col justify-start gap-x-4 gap-y-6 md:grid md:grid-cols-2">
          <CompanyItem title="Name" value={company?.name || ''} />
          <CompanyItem title="Email" value={company?.email || ''} />
          <CompanyItem
            title="Phone Number"
            value={company?.phoneNumber || ''}
          />
          <CompanyItem title="Location" value={company?.location || ''} />
          <CompanyItem title="Category" value={company?.category || ''} />
          <CompanyItem title="Description" value={company?.description || ''} />
        </div>
      </div>
      <Button asChild className="self-end">
        <Link
          href={`/companies/${company?.slug}`}
          aria-label="Company profile page"
        >
          <ArrowUpRight size={16} />
          View Company
        </Link>
      </Button>
    </div>
  ) : (
    <p className="text-primary-gray p-10 text-sm">
      This user has not worked at any companies yet.
    </p>
  );
};

const CompanyItem = ({ title, value }: CompanyItemProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-primary-gray text-sm">{title}</span>
      <div>
        <p className="line-clamp-3">{value ? value : <Minus size={16} />}</p>
      </div>
    </div>
  );
};

export default Company;
