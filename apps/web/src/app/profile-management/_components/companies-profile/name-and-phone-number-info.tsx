import * as React from 'react';

import { FormikProps } from 'formik';
import { IUpdateForm } from '@/types/profile';

interface FormValues {
  formik: FormikProps<IUpdateForm>;
}

export default function NameAndPhoneNumber({
  formik,
}: {
  formik: FormValues['formik'];
}) {
  return (
    <div className="max-w-[1065px] md:px-[30px]">
      <div className="flex items-center gap-1">
        <div className="flex w-full flex-col justify-center">
          <div className="pb-[5px] pt-[13px] font-medium">Name</div>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
            placeholder="E.g. Pacifista Corporation"
            id="name"
            name="name"
          />
        </div>
        <div className="flex w-full flex-col justify-center">
          <div className="pb-[5px] pt-[13px] font-medium">Phone Number</div>
          <input
            type="text"
            className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
            placeholder="0895*********"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phoneNumber"
            name="phoneNumber"
          />
        </div>
      </div>
    </div>
  );
}
