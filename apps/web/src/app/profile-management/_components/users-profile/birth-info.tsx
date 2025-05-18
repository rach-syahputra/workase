import { FormikProps } from 'formik';
import { IUpdateForm } from '@/lib/interfaces/profile';

interface BirthInfoProps {
  formik: FormikProps<IUpdateForm>;
}

export const BirthInfo: React.FC<BirthInfoProps> = ({ formik }) => (
  <div className="max-w-[1065px] md:px-[30px]">
    <div className="flex items-center gap-1">
      <div className="flex w-full flex-col justify-center">
        <div className="pb-[5px] pt-[13px] font-medium">Place of Birth</div>
        <input
          value={formik.values.placeOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
          placeholder="E.g. Mojokerto"
          id="placeOfBirth"
          name="placeOfBirth"
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <div className="pb-[5px] pt-[13px] font-medium">Date of Birth</div>
        <input
          type="date"
          className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
          placeholder=""
          value={
            formik.values.dateOfBirth &&
            !isNaN(new Date(formik.values.dateOfBirth).getTime())
              ? new Date(formik.values.dateOfBirth).toISOString().split('T')[0]
              : ''
          }
          onChange={(e) => {
            const dateValue = e.target.value
              ? new Date(e.target.value).toISOString()
              : '';
            formik.setFieldValue('dateOfBirth', dateValue);
          }}
          onBlur={formik.handleBlur}
          id="dateOfBirth"
          name="dateOfBirth"
        />
      </div>
    </div>
  </div>
);
