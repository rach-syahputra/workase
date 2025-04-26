import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { FormikProps } from 'formik';
import { IUpdateForm } from '@/types/profile';
import { useSession } from 'next-auth/react';

interface GenderEducationProps {
  formik: FormikProps<IUpdateForm>;
}

export const GenderEducation: React.FC<GenderEducationProps> = ({ formik }) => {
  const { data: session } = useSession();
  console.log('ini formik', formik.values.gender, formik.values.lastEducation);
  return (
    <div className="max-w-[1065px] md:px-[30px]">
      <div className="flex flex-col items-center gap-1 md:flex-row">
        <div className="flex flex-col justify-center w-full">
          <div className="pb-[5px] pt-[13px] font-medium">Gender</div>
          <Select
            value={formik.values.gender || session?.user?.gender}
            onValueChange={(value) => formik.setFieldValue('gender', value)}
          >
            <SelectTrigger id="gender" name="gender">
              <SelectValue
                placeholder="Select"
                className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
              />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="pb-[5px] pt-[13px] font-medium">Last Education</div>
          <input
            type="text"
            className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
            placeholder="E.g. SMA Negeri 1 Mojokerto"
            value={formik.values.lastEducation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="lastEducation"
            name="lastEducation"
          />
        </div>
      </div>
    </div>
  );
};
