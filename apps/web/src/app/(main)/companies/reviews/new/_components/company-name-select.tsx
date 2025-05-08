'use client';

import { Dispatch, SetStateAction } from 'react';
import { FormikProps } from 'formik';

import { AddCompanyReviewFormValues } from '@/lib/interfaces/form/company-review';
import { useCompaniesReviewsContext } from '@/context/companies-reviews-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';

interface CompanyNameSelectProps {
  formik: FormikProps<AddCompanyReviewFormValues>;
  setJobTitle: Dispatch<SetStateAction<string>>;
}

const CompanyNameSelect = ({ formik, setJobTitle }: CompanyNameSelectProps) => {
  const { userCurrentCompanies } = useCompaniesReviewsContext();

  const handleSelectCompanyName = (value: string) => {
    formik.setFieldValue('companyId', value);

    const selectedCompany = userCurrentCompanies.find(
      (company) => company.id === value,
    );
    setJobTitle(selectedCompany?.jobTitle || '-');
  };

  return (
    <Select onValueChange={(value) => handleSelectCompanyName(value)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue
          placeholder="-- Select Your Company --"
          defaultValue={userCurrentCompanies[0]?.name || '--'}
          className="w-full"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Company Name</SelectLabel>
          {userCurrentCompanies &&
            userCurrentCompanies.length > 0 &&
            userCurrentCompanies.map((company, index) => (
              <SelectItem key={index} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CompanyNameSelect;
