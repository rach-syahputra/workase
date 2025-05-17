import { Button } from '@/components/shadcn-ui/button';
import { FormikProps } from 'formik';
import { IUpdateForm } from '@/lib/interfaces/profile';

interface AddressProps {
  formik: FormikProps<IUpdateForm>;
}

export const Address: React.FC<AddressProps> = ({ formik }) => (
  <div className="max-w-[1065px] md:px-[30px]">
    <div className="pb-[5px] pt-[13px] font-medium">Address</div>
    <textarea
      value={formik.values.address}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="h-[90px] w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
      placeholder="E.g. Jl. Raya Mojokerto No. 1, Mojokerto, Jawa Timur, Indonesia"
      id="address"
      name="address"
    />
  </div>
);
